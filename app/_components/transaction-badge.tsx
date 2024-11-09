import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";

interface TransactionBadgeProps {
  transaction: Transaction;
}

export function TransactionBadge({ transaction }: TransactionBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Deposit
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Expense
      </Badge>
    );
  }

  return (
    <Badge className="bg-white bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investment
    </Badge>
  );
}
