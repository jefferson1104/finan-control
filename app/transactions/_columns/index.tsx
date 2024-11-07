"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { TransactionBadge } from "@/app/_components/transaction-badge";
import {
  dateToLocaleString,
  formatCurrency,
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_utils/transaction";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row: { original: transaction } }) => (
      <TransactionBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row: { original: transaction } }) =>
      dateToLocaleString(transaction.date, "en-US"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row: { original: transaction } }) =>
      formatCurrency(Number(transaction.amount), "en-US", "USD"),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
