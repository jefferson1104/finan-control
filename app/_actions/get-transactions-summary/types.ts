import { TransactionCategory, TransactionType } from "@prisma/client";

export type TTransactionTypePercentage = {
  [key in TransactionType]: number;
};

export interface ITotalExpenseCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
