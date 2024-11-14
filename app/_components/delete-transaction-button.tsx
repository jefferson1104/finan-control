"use client";
import { useState } from "react";
import { LoaderCircle, TrashIcon } from "lucide-react";

import { deleteTransaction } from "../_actions/delete-transaction";

import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

export function DeleteTransactionButton({
  transactionId,
}: DeleteTransactionButtonProps) {
  // States
  const [isLoading, setIsLoading] = useState(false);

  // Methods
  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      await deleteTransaction({ transactionId });
      toast.success("Transaction deleted successfully.");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Error deleting transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete this transaction? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleConfirmDelete}>
            {isLoading ? "Deleting..." : "Continue"}
            {isLoading && <LoaderCircle className="animate-spin text-white" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
