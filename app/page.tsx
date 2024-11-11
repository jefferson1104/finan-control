import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Navbar } from "@/app/_components/navbar";

export default async function Home() {
  // Constants
  const { userId } = auth();

  // Renders
  if (!userId) {
    redirect("/login");
  }
  return <Navbar />;
}
