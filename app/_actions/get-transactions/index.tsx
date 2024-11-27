import { db } from "@/app/_lib/prisma";

export const getTransactions = async (userId: string, month: string) => {
  const currentYear = new Date().getFullYear();
  const startOfMonth = new Date(currentYear, Number(month) - 1, 1);
  const endOfMonth = new Date(currentYear, Number(month), 0);

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
      userId,
    },
    orderBy: { date: "asc" },
  });

  return {
    transactions,
  };
};
