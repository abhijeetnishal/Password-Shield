"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useFetch from "@/src/hooks/useFetch";
import { AuthService } from "@/src/services/AuthService";
import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";
import { setCookie } from "cookies-next";
import useAuthStore from "@/src/store/authStore";
import useProfileStore from "@/src/store/profileStore";
import { useRouter } from "next/navigation";
import { ProfileService } from "@/src/services/ProfileService";
import Header from "@/src/components/Headers/Header";

const Login = () => {
  const router = useRouter();
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setProfile = useProfileStore((state) => state.setProfileDetails);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [
    { data: loginData, isLoading: isLoginLoading, isError: isLoginError },
    getLoginAPI,
  ] = useFetch(null);
  const [
    {
      data: userDetailsData,
      isLoading: isUserDetailsLoading,
      isError: isUserDetailsError,
    },
    getUserDetailsAPI,
  ] = useFetch(null);

  useEffect(() => {
    const { code } = loginData;

    if (code === 200) {
      const { data } = loginData;
      const token = data.token;

      setCookie("token", token);
      setAuthToken(token);

      getUserDetailsAPI(() => () => ProfileService.getUserProfile(token));
    }
  }, [loginData, isLoginError]);

  useEffect(() => {
    const { code } = userDetailsData;

    if (code === 200) {
      const { data } = userDetailsData;
      setProfile(data);

      router.push("/dashboard");
    }
  }, [userDetailsData, isUserDetailsError]);

  const onHandleSubmit = () => {
    if (email === "") {
      setErrorMessage("Enter Email");
    } else if (password === "") {
      setErrorMessage("Enter Password");
    } else {
      getLoginAPI(
        () => () => AuthService.emailLogin({ email: email, password: password })
      );
    }
  };

  return (
    <div data-testid="login" className=" ">
      <div className="flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-5 rounded shadow m-2 flex flex-col w-4/5 lg:w-1/3 mt-16">
            <h1 className="text-3xl self-center">Login</h1>

            <input
              className="border rounded m-2 h-12 p-2 shadow-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <input
              className="border rounded m-2 h-12 p-2 shadow-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button
              onClick={onHandleSubmit}
              disabled={isLoginLoading}
              className="w-full bg-blue-400 border rounded m-2 h-12 p-2 shadow-sm"
            >
              Submit
            </button>

            {isLoginLoading ? <LoadingSpinner /> : null}

            <div className="">{errorMessage}</div>
          </div>
          <div className="flex flex-col items-center mt-12">
            <p className="">
              Don&apos;t have an account?{" "}
              <span>
                <Link
                  className="text-teal-600 hover:underline"
                  href="/auth/register"
                >
                  Register
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
