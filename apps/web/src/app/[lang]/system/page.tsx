import { redirect } from "next/navigation";

interface DashboardPageProps {
  params: Promise<{ lang: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { lang } = await params;
  redirect(`/${lang}/system/stocks`);
}
