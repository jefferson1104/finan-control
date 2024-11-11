import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";

import { Navbar } from "@/app/_components/navbar";
import { SummaryCards } from "@/app/_components/summary-cards";
import { TimeSelect } from "@/app/_components/time-select";

interface HomeProps {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  // Constants
  const { userId } = auth();
  const monthIsInvalid = !month || !isMatch(month, "MM");

  // Renders
  if (!userId) {
    redirect("/login");
  }
  if (monthIsInvalid) {
    redirect("/?month=01");
  }
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  );
}
