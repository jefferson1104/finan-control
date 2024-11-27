import { NextResponse } from "next/server";

import { getTransactions } from "@/app/_actions/get-transactions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const month = searchParams.get("month") || "";

  if (!userId) {
    return NextResponse.json({ transactions: [] }, { status: 400 });
  }

  const { transactions } = await getTransactions(userId, month);
  return NextResponse.json({ transactions });
}
