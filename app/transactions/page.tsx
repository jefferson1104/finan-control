import { ArrowDownUpIcon } from "lucide-react";

import { db } from "@/app/_lib/prisma";

import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";

import { transactionColumns } from "./_columns";

export default async function TransactionsPage() {
  // Constants
  const transactions = await db.transaction.findMany({});

  // Renders
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button className="rounded-full font-bold">
          Add transaction
          <ArrowDownUpIcon />
        </Button>
      </div>

      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
}
