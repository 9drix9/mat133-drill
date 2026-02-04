import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardNav } from "@/components/practice/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav user={user} />
      <div className="flex-1 container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
