import useAuth from "@/src/hooks/useAuth";
import { getCookie } from "cookies-next";

const AuthHoc = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useAuth({
    redirectTo: "/auth/login",
    token: getCookie("token") as string,
  });

  return <div>{children}</div>;
};

export default AuthHoc;
