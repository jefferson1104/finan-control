import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/app/_lib/prisma";

import { Navbar } from "@/app/_components/navbar";
import { TransactionList } from "@/app/_components/transaction-list";

export default async function TransactionsPage() {
  // Constants
  const { userId } = auth();

  // Utils
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  // Renders
  return (
    <>
      <Navbar />
      <TransactionList
        transactions={JSON.parse(JSON.stringify(transactions))}
      />
    </>
  );
}
