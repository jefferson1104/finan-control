import { ReactNode } from "react";

import { formatCurrency } from "@/app/_utils/transaction";

import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size: "small" | "large";
}

export function SummaryCard({ icon, title, amount, size }: SummaryCardProps) {
  // Renders
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size == "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {formatCurrency({ amount, locale: "en-US", currency: "USD" })}
        </p>
        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
}
