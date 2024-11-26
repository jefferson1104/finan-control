import { NextResponse } from "next/server";
import { getTransactions } from "@/app/_actions/get-transactions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const query = searchParams.get("query") || "";

  if (!userId) {
    return NextResponse.json({ transactions: [] }, { status: 400 });
  }

  const { transactions } = await getTransactions(userId, query);
  return NextResponse.json({ transactions });
}
