import { ReactNode } from "react";
import { MessageCircleWarning } from "lucide-react";

import { formatCurrency } from "@/app/_utils/transaction";

import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  investedAmount?: number;
  size: "small" | "large";
  isOpacityBackground?: boolean;
}

export function SummaryCard({
  icon,
  title,
  amount,
  investedAmount,
  size,
  isOpacityBackground = false,
}: SummaryCardProps) {
  // Constants
  const totalAmount = amount + (investedAmount || 0);

  // Renders
  return (
    <Card className={`${isOpacityBackground ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <div className="flex items-baseline gap-4">
          <p
            className={`${size == "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
          >
            {title}
          </p>
          {investedAmount && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MessageCircleWarning className="size-6" />
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="text-sm text-white">
                    you have more{" "}
                    {formatCurrency({
                      amount: investedAmount,
                      locale: "en-US",
                      currency: "USD",
                    })}{" "}
                    invested, so the total balance is{" "}
                    {formatCurrency({
                      amount: totalAmount,
                      locale: "en-US",
                      currency: "USD",
                    })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
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
