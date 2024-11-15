import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import { SummaryCard } from "@/app/_components/summary-card";

interface SummaryCardsProps {
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

export async function SummaryCards({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: SummaryCardsProps) {
  // Renders
  return (
    <div className="space-y-6">
      <SummaryCard
        title="Balance"
        amount={balance}
        investedAmount={investmentsTotal}
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
            <div className="rounded-md bg-background p-2">
              <PiggyBankIcon size={16} />{" "}
            </div>
          }
        />

        <SummaryCard
          title="Income"
          amount={depositsTotal}
          size="small"
          icon={
            <div className="rounded-md bg-green-500 bg-opacity-10 p-2">
              <TrendingUpIcon size={16} className="text-primary" />
            </div>
          }
        />

        <SummaryCard
          title="Expenses"
          amount={expensesTotal}
          size="small"
          icon={
            <div className="rounded-md bg-red-500 bg-opacity-10 p-2">
              <TrendingDownIcon size={16} className="text-red-500" />
            </div>
          }
        />
      </div>
    </div>
  );
}
