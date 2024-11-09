"use client";
import { useState } from "react";
import { ArrowDownUpIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { TransactionFormDialog } from "@/app/_components/transaction-form-dialog";

export function AddTransactionButton() {
  // State
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // Renders
  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        New transaction
        <ArrowDownUpIcon />
      </Button>

      <TransactionFormDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
}
