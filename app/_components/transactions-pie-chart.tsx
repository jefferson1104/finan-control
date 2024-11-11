"use client";
import { Pie, PieChart } from "recharts";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { TransactionType } from "@prisma/client";

import { TTransactionTypePercentage } from "@/app/_actions/get-transactions-summary/types";

import { TransactionPercentageItem } from "./transaction-percentage-item";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investments",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Income",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Expenses",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  transactionsTypePercentage: TTransactionTypePercentage;
}

export function TransactionsPieChart({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  transactionsTypePercentage,
}: TransactionsPieChartProps) {
  // Utils
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];

  // Renders
  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <TransactionPercentageItem
            title="Income"
            value={transactionsTypePercentage[TransactionType.DEPOSIT]}
            icon={
              <div className="rounded-md bg-green-500 bg-opacity-10 p-2">
                <TrendingUpIcon size={16} className="text-primary" />
              </div>
            }
          />
          <TransactionPercentageItem
            title="Expenses"
            value={transactionsTypePercentage[TransactionType.EXPENSE]}
            icon={
              <div className="rounded-md bg-red-500 bg-opacity-10 p-2">
                <TrendingDownIcon size={16} className="text-red-500" />
              </div>
            }
          />
          <TransactionPercentageItem
            title="Investments"
            value={transactionsTypePercentage[TransactionType.INVESTMENT]}
            icon={
              <div className="rounded-md bg-white bg-opacity-5 p-2">
                <PiggyBankIcon size={16} />{" "}
              </div>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
