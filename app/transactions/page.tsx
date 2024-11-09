import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";

import { DataTable } from "@/app/_components/ui/data-table";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";

import { transactionColumns } from "./_columns";

export default async function TransactionsPage() {
  // Constants
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  // Renders
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionButton />
      </div>

      <DataTable
        columns={transactionColumns}
        data={JSON.parse(JSON.stringify(transactions))}
      />
    </div>
  );
}
