import { db } from "@/app/_lib/prisma";

export const getTransactions = async (userId: string) => {
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  return {
    transactions,
  };
};
