import type { Metadata } from "next";
import HistoryView from "@/components/history-view";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "History — AI Resume Match",
};

export default async function HistoryPage() {
  const session = await auth();
  return <HistoryView userName={session?.user?.name ?? session?.user?.email ?? undefined} />;
}
