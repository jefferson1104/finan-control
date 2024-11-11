import Link from "next/link";
import Image from "next/image";
import { Transaction } from "@prisma/client";

import {
  formatCurrency,
  shortDateToLocaleString,
  TRANSACTION_PAYMENT_METHOD_ICONS,
} from "@/app/_utils/transaction";

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Button } from "@/app/_components/ui/button";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

export function LastTransactions({ lastTransactions }: LastTransactionsProps) {
  // Method
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === "DEPOSIT") {
      return "text-primary";
    }

    if (transaction.type === "EXPENSE") {
      return "text-red-500";
    }

    return "text-white";
  };

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === "DEPOSIT") {
      return "+";
    }

    return "-";
  };

  // Renders
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Last transactions</CardTitle>
        <Button variant="outline" className="rounded-full font-bold">
          <Link href="/transactions">See all</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-white bg-opacity-5 p-3">
                <Image
                  src={`/icons/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="Pix"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-muted-foreground">
                  {shortDateToLocaleString(transaction.date, "en-US")}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency({
                amount: Number(transaction.amount),
                locale: "en-US",
                currency: "USD",
              })}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
