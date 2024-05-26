import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
