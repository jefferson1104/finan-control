import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";

import { getTransactionsSummary } from "@/app/_actions/get-transactions-summary";

import { Navbar } from "@/app/_components/navbar";
import { SummaryCards } from "@/app/_components/summary-cards";
import { TimeSelect } from "@/app/_components/time-select";
import { TransactionsPieChart } from "@/app/_components/transactions-pie-chart";
import { TransactionExpensesByCategory } from "./_components/transaction-expenses-by-category";
import { LastTransactions } from "./_components/last-transactions";

interface HomeProps {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  // Constants
  const { userId } = auth();
  const monthIsInvalid = !month || !isMatch(month, "MM");

  // Utils
  if (!userId) {
    redirect("/login");
  }
  if (monthIsInvalid) {
    redirect("/?month=01");
  }

  const dashboardData = await getTransactionsSummary(month, userId);

  // Renders
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards
              balance={dashboardData.balance}
              depositsTotal={dashboardData.depositsTotal}
              investmentsTotal={dashboardData.investmentsTotal}
              expensesTotal={dashboardData.expensesTotal}
            />

            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboardData} />
              <TransactionExpensesByCategory
                expensesByCategory={dashboardData.totalExpensesByCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboardData.lastTransactions} />
        </div>
      </div>
    </>
  );
}
