import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {/* Tu navbar o layout general */}
      <div className="flex">
        {/* Puedes usar tu Navbar/Sidebar importado aquí */}
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}

