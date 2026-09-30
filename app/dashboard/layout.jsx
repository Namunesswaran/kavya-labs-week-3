import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen md:flex">
      <DashboardNav user={session.user} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
