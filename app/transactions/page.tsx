import { redirect } from "next/navigation";
import { isMatch } from "date-fns";

import { getUser } from "@/app/_actions/get-user";

import { Navbar } from "@/app/_components/navbar";
import { Transactions } from "@/app/_components/transactions";

interface TransactionsPageProps {
  searchParams: { month: string };
}

export default async function TransactionsPage({
  searchParams: { month },
}: TransactionsPageProps) {
  // Utils
  await getUser();
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`/transactions?month=${new Date().getMonth() + 1}`);
  }

  // Renders
  return (
    <>
      <Navbar />
      <Transactions />
    </>
  );
}
