import { getUser } from "@/app/_actions/get-user";
import { getTransactions } from "@/app/_actions/get-transactions";

import { Navbar } from "@/app/_components/navbar";
import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { transactionColumns } from "@/app/_components/transaction-list";
import { AddTransactionButton } from "@/app/_components/add-transaction-button";

export default async function TransactionsPage() {
  // Constants
  const { userId } = await getUser();
  const { transactions } = await getTransactions(userId);

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
