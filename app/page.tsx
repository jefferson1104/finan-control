import { redirect } from "next/navigation";
import { isMatch } from "date-fns";

import { getUser } from "@/app/_actions/get-user";
import { getTransactionsSummary } from "@/app/_actions/get-transactions-summary";

import { Navbar } from "@/app/_components/navbar";
import { SummaryCards } from "@/app/_components/summary-cards";
import { TimeSelect } from "@/app/_components/time-select";
import { TransactionsPieChart } from "@/app/_components/transactions-pie-chart";
import { TransactionExpensesByCategory } from "@/app/_components/transaction-expenses-by-category";
import { LastTransactions } from "@/app/_components/last-transactions";

interface HomeProps {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  // Utils
  await getUser();
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/?month=${new Date().getMonth() + 1}`);
  }
  const dashboardData = await getTransactionsSummary(month);

  // Renders
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              balance={dashboardData.balance}
              depositsTotal={dashboardData.depositsTotal}
              investmentsTotal={dashboardData.investmentsTotal}
              expensesTotal={dashboardData.expensesTotal}
            />

            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart
                {...JSON.parse(JSON.stringify(dashboardData))}
              />
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
