import type { Metadata } from "next";
import HistoryView from "@/components/history-view";

export const metadata: Metadata = {
  title: "History — AI Resume Match",
};

export default function HistoryPage() {
  return <HistoryView />;
}
