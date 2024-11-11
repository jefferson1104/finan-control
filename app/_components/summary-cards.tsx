import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import { db } from "@/app/_lib/prisma";

import { SummaryCard } from "@/app/_components/summary-card";

interface SummaryCardsProps {
  month: string;
}

export async function SummaryCards({ month }: SummaryCardsProps) {
  // Constants
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  // Utils
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
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  // Renders
  return (
    <div className="space-y-6">
      <SummaryCard
        title="Balance"
        amount={balance}
        size="large"
        isOpacityBackground
        icon={
          <div className="rounded-md bg-background p-2">
            <WalletIcon size={16} />
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investments"
          amount={investmentsTotal}
          size="small"
          isOpacityBackground
          icon={
            <div className="rounded-md bg-background p-1">
              <PiggyBankIcon size={16} />{" "}
            </div>
          }
        />

        <SummaryCard
          title="Income"
          amount={depositsTotal}
          size="small"
          icon={
            <div className="rounded-md bg-green-500 bg-opacity-10 p-1">
              <TrendingUpIcon size={16} className="text-primary" />
            </div>
          }
        />

        <SummaryCard
          title="Expenses"
          amount={expensesTotal}
          size="small"
          icon={
            <div className="rounded-md bg-red-500 bg-opacity-10 p-1">
              <TrendingDownIcon size={16} className="text-red-500" />
            </div>
          }
        />
      </div>
    </div>
  );
}
