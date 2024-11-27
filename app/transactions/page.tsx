import { getUser } from "@/app/_actions/get-user";

import { Navbar } from "@/app/_components/navbar";
import { Transactions } from "@/app/_components/transactions";

export default async function TransactionsPage() {
  // Utils
  await getUser();

  // Renders
  return (
    <>
      <Navbar />
      <Transactions />
    </>
  );
}
