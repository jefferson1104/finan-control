"use server";
import { TransactionType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/app/_lib/prisma";

import { ITotalExpenseCategory, TTransactionTypePercentage } from "./types";

export const getTransactionsSummary = async (month: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentYear = new Date().getFullYear();
  const startOfMonth = new Date(currentYear, Number(month) - 1, 1);
  const endOfMonth = new Date(currentYear, Number(month), 0);

  const where = {
    date: {
      gte: startOfMonth,
      lt: endOfMonth,
    },
    userId,
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const balance = depositsTotal - expensesTotal;

  const transactionsTypePercentage: TTransactionTypePercentage = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensesByCategory: ITotalExpenseCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: { ...where, type: TransactionType.EXPENSE },
      _sum: { amount: true },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    transactionsTypePercentage,
    totalExpensesByCategory,
    lastTransactions,
  };
};
