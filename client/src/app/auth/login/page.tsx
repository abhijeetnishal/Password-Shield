"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoginSvg from "@/public/assets/Login.svg";
import useThemeStore from "@/src/store/themeStore";

import Image from "next/image";

import useFetch from "@/src/hooks/useFetch";
import { AuthService } from "@/src/services/AuthService";
import { setCookie } from "cookies-next";
import useAuthStore from "@/src/store/authStore";
import useProfileStore from "@/src/store/profileStore";
import { useRouter } from "next/navigation";
import { ProfileService } from "@/src/services/ProfileService";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import Eye from "@/src/components/Icons/Eye";


const Login = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const router = useRouter();
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setProfile = useProfileStore((state) => state.setProfileDetails);

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
    const { code, message } = loginData;

    if (code === 200) {
      const { data } = loginData;
      const token = data.token;

      setCookie("token", token);
      setAuthToken(token);

      getUserDetailsAPI(() => () => ProfileService.getUserProfile(token));
    } else {
      setErrorMessage(message);
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
      setErrorMessage("");
      getLoginAPI(
        () => () => AuthService.emailLogin({ email: email, password: password })
      );
    }
  };

  return (
    <div data-testid="login">
      <Navbar landingPage={false} />
      <div
        className={`flex w-screen  flex-wrap ${
          theme === "light"
            ? "text-slate-800 "
            : "text-white  border-t-2 border-gray-600 bg-[#12141D]"
        }`}
      >
        <div className="flex w-full  h-auto flex-col md:w-1/2">
          <div className="my-3 mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
              Welcome back <br />
              to <span className="text-blue-600">KeySafe.</span>
            </p>
            <p className="mt-6 text-center font-medium md:text-left">
              Sign in to your account below.
            </p>
            <div className="flex flex-col items-stretch pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border border-gray-500 transition focus-within:border-blue-600">
                  <input
                    type="email"
                    id="login-email"
                    className={`w-full flex-shrink appearance-none ${
                      theme === "light"
                        ? "bg-[white] text-gray-700 "
                        : "bg-[#12141D] text-white "
                    } border-gray-500 py-2 px-4 text-base  placeholder-gray-400 focus:outline-none`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border border-gray-500 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="login-password"
                    className={`w-full flex-shrink appearance-none ${
                      theme === "light"
                        ? "bg-[white]  text-gray-700"
                        : "bg-[#12141D] text-white"
                    } border-gray-500 py-2 px-4 text-base  placeholder-gray-400 focus:outline-none`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 "
                    onClick={togglePasswordVisibility}

                  ><Eye /></button>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-center text-sm font-medium text-gray-600 md:text-left"
              >
                Forgot password?
              </a>

              <div className="my-2 text-red-500">{errorMessage}</div>

              <button
                disabled={isLoginLoading}
                onClick={onHandleSubmit}
                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
              >
                Sign in
              </button>
            </div>
            <div className="py-12 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?
                <Link
                  href="/auth/register"
                  className={`whitespace-nowrap px-1 font-semibold ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } underline underline-offset-4`}
                >
                  Sign up for free.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden px-10 select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
          <div className="pt-9 py-4 px-8 text-white xl:w-[40rem]">
            <p className="mb-6 mt-1 text-3xl font-semibold leading-10">
              Never Forget Your Passwords Again!
              <span className="abg-white whitespace-nowrap py-2 text-cyan-300">
                {" "}
                Safe & Secure
              </span>
              .
            </p>
            <p className="mb-4">
              Managing passwords can be tough, but with KeySafe, you don&apos;t
              have to worry about forgetting them anymore.
            </p>
          </div>
          <Image
            alt="login illustration"
            src={LoginSvg}
            className="ml-8 w-11/12 max-w-lg py-5 rounded-lg object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
