"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Transaction } from "@prisma/client";

import { deleteTransaction } from "@/app/_actions/delete-transaction";
import {
  upsertTransaction,
  UpsertTransactionParams,
} from "@/app/_actions/upsert-transaction";

// Interfaces e tipos
interface TransactionsContextProps {
  transactions: Transaction[];
  isFetching: boolean;
  fetchTransactions: () => Promise<void>;
  upsertTransaction: (transaction: UpsertTransactionParams) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

// Criação do contexto
const TransactionsContext = createContext<TransactionsContextProps | undefined>(
  undefined,
);

// Provider
export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  // Hooks
  const { user } = useUser();
  const searchParams = useSearchParams();

  // States
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Constants
  const userId = user?.id;
  const currentMonth = searchParams.get("month");

  // Methods
  const fetchTransactions = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        `/api/get-transactions?userId=${userId}&month=${currentMonth}`,
      );
      const { transactions } = await response.json();
      setTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setIsFetching(false);
    }
  };

  const updateTransactionsHandler = async () => {
    try {
      const response = await fetch(
        `/api/get-transactions?userId=${userId}&month=${currentMonth}`,
      );
      const { transactions } = await response.json();
      setTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const upsertTransactionHandler = async (
    transaction: UpsertTransactionParams,
  ) => {
    try {
      await upsertTransaction(transaction);
      await updateTransactionsHandler();
    } catch (error) {
      console.error("Error to upsert transaction:", error);
    }
  };

  const deleteTransactionHandler = async (transactionId: string) => {
    try {
      await deleteTransaction({ transactionId });
      await updateTransactionsHandler();
    } catch (error) {
      console.error("Error to delete transaction:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId, currentMonth]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isFetching,
        fetchTransactions,
        upsertTransaction: upsertTransactionHandler,
        deleteTransaction: deleteTransactionHandler,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// Hook personalizado
export const useTransactions = (): TransactionsContextProps => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
};
