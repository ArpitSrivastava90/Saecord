import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function layout({ children }: AuthLayoutProps) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <>{children}</>;
}
