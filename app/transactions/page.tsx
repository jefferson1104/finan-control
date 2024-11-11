import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/app/_lib/prisma";

import { Navbar } from "@/app/_components/navbar";
import { DataTable } from "@/app/_components/ui/data-table";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

import { transactionColumns } from "./_columns";

export default async function TransactionsPage() {
  // Constants
  const { userId } = auth();

  // Utils
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: { userId },
  });

  // Renders
  return (
    <>
      <Navbar />
      <div className="mb-8 flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <AddTransactionButton />
        </div>

        <ScrollArea className="h-full overflow-hidden">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
}
