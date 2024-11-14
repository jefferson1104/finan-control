import { ITotalExpenseCategory } from "@/app/_actions/get-transactions-summary/types";

import {
  formatCurrency,
  TRANSACTION_CATEGORY_LABELS,
} from "@/app/_utils/transaction";

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { EmptyState } from "@/app/_components/empty-state";

interface TransactionExpensesByCategoryProps {
  expensesByCategory: ITotalExpenseCategory[];
}

export function TransactionExpensesByCategory({
  expensesByCategory,
}: TransactionExpensesByCategoryProps) {
  // Constants
  const hasTransactions = expensesByCategory.length > 0;

  // Renders
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      {!hasTransactions && <EmptyState />}

      {hasTransactions && (
        <>
          <CardHeader>
            <CardTitle>Expenses by categories</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {expensesByCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex w-full justify-between">
                  <p className="text-sm font-bold">
                    {TRANSACTION_CATEGORY_LABELS[category.category]}
                  </p>
                  <p className="text-sm font-bold">
                    {category.percentageOfTotal}%
                  </p>
                </div>
                <Progress value={category.percentageOfTotal} />
                <p className="text-sm text-[#71717A]">
                  {formatCurrency({
                    amount: category.totalAmount,
                    currency: "USD",
                    locale: "en-US",
                  })}
                </p>
              </div>
            ))}
          </CardContent>
        </>
      )}
    </ScrollArea>
  );
}
