import type { Metadata } from "next";
import HistoryView from "@/components/history-view";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "History — AI Resume Match",
};

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fhistory");
  }

  return <HistoryView userName={session.user.name ?? session.user.email ?? undefined} />;
}
