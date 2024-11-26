import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return { userId };
};
