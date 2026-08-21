import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AnalyzeView from "@/components/analyze-view";

export default async function AnalyzePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fanalyze");
  }

  return <AnalyzeView />;
}
