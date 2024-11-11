import { TransactionType } from "@prisma/client";

export type TTransactionTypePercentage = {
  [key in TransactionType]: number;
};
