"use client";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Transaction } from "@prisma/client";

import { Button } from "@/app/_components/ui/button";
import { TransactionFormDialog } from "@/app/_components/transaction-form-dialog";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  // State
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // Renders
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>

      <TransactionFormDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
          date: new Date(transaction.date),
        }}
        transactionId={transaction.id}
      />
    </>
  );
}
