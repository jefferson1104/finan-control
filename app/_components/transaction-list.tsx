"use client";
import { useEffect, useState } from "react";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import {
  dateToLocaleString,
  formatCurrency,
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_utils/transaction";

import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { DataTable } from "@/app/_components/ui/data-table";
import { DeleteTransactionButton } from "@/app/_components/delete-transaction-button";
import { EditTransactionButton } from "@/app/_components/edit-transaction.button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TransactionBadge } from "@/app/_components/transaction-badge";
import { Input } from "@/app/_components/ui/input";

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
      formatCurrency({
        amount: Number(transaction.amount),
        locale: "en-US",
        currency: "USD",
      }),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionList, setTransactionList] =
    useState<Transaction[]>(transactions);

  // Methods
  const handleSearch = (term: string) => {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(term.toLowerCase()),
    );

    setTransactionList(filteredTransactions);
  };

  // Effects
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  // Renders
  return (
    <div className="mb-8 flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex w-full items-center justify-end gap-4">
          <Input
            className="max-w-80"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddTransactionButton />
        </div>
      </div>
      <ScrollArea className="h-full overflow-hidden">
        <DataTable columns={transactionColumns} data={transactionList} />
      </ScrollArea>
    </div>
  );
}
