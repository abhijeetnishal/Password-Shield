import useAuth from "@/hooks/useAuth";
import { getCookie } from "cookies-next";

export const AuthHoc = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useAuth({
    redirectTo: "/auth",
    token: getCookie("token") as string,
  });

  return <div>{children}</div>;
};
