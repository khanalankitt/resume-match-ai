import type { Metadata } from "next";
import HistoryView from "@/components/history-view";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Analysis History",
  description: "Review all your past resume analyses and match reports.",
  alternates: { canonical: "https://airesumematch.khanalankit.com/history" },
};

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fhistory");
  }

  return <HistoryView userName={session.user.name ?? session.user.email ?? undefined} />;
}
