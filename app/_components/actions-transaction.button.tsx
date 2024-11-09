"use client";
import { useState } from "react";
import { PencilIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { TransactionFormDialog } from "@/app/_components/transaction-form-dialog";
import { Transaction } from "@prisma/client";

interface ActionsTransactionButtonProps {
  transaction: Transaction;
}

export function ActionsTransactionButton({
  transaction,
}: ActionsTransactionButtonProps) {
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
        }}
        transactionId={transaction.id}
      />
    </>
  );
}
