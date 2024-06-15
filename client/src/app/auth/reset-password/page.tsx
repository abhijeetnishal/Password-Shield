"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/src/hooks/useFetch";
import { AuthService } from "@/src/services/AuthService";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import useThemeStore from "@/src/store/themeStore";
import Image from "next/image";
import ResetPasswordSvg from "@/public/assets/Login.svg";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useThemeStore((state) => state.theme);
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [{ isLoading, data, isError}, resetPasswordAPI] = useFetch(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
    else{
      router.push("/auth/login");
    }
  }, [searchParams,router]);

  useEffect(() => {
    if (data) {
      const { code, message } = data;
      if (code === 200) {
        setSuccessMessage("Password has been reset successfully");
        router.push("/auth/login");
      } else {
        setErrorMessage(message);
      }
    } else if (isError) {
      setErrorMessage(isError.message);
    }
  }, [data, isError, router]);

  const onHandleSubmit = () => {
    if (!password) {
      setErrorMessage("Enter Password");
    } else if (!confirmPassword) {
      setErrorMessage("Enter Confirm Password");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (!token) {
      setErrorMessage("Token Is Missing")
    } else {
      setErrorMessage("");
      setSuccessMessage("");
      resetPasswordAPI(() => AuthService.resetPassword({ password }, token));
    }
  };

  return (
    <div data-testid="reset-password">
      <Navbar landingPage={false} />
      <div
        className={`flex w-screen flex-wrap ${
          theme === "light"
            ? "text-slate-800 "
            : "text-white border-t-2 border-gray-600 bg-[#12141D]"
        }`}
      >
        <div className="flex w-full h-lvh flex-col md:w-1/2">
          <div className="my-3 mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
              Reset your <br />
              <span className="text-blue-600">Password</span>
            </p>
            <p className="mt-6 text-center font-medium md:text-left">
              Enter your new password below.
            </p>
            <div className="flex flex-col items-stretch pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border border-gray-500 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="reset-password"
                    className={`w-full flex-shrink appearance-none ${
                      theme === "light"
                        ? "bg-[white] text-gray-700 "
                        : "bg-[#12141D] text-white "
                    } border-gray-500 py-2 px-4 text-base placeholder-gray-400 focus:outline-none`}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border border-gray-500 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="confirm-password"
                    className={`w-full flex-shrink appearance-none ${
                      theme === "light"
                        ? "bg-[white] text-gray-700 "
                        : "bg-[#12141D] text-white "
                    } border-gray-500 py-2 px-4 text-base placeholder-gray-400 focus:outline-none`}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="my-2 text-red-500">{errorMessage}</div>
              <div className="my-2 text-green-500">{successMessage}</div>

              <button
                disabled={isLoading}
                onClick={onHandleSubmit}
                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
              >
                Submit
              </button>
            </div>
            <div className="py-12 text-center">
              <p className="text-gray-600">
                Remember your password?
                <Link
                  href="/auth/login"
                  className={`whitespace-nowrap px-1 font-semibold ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  } underline underline-offset-4`}
                >
                  Back to Login.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden px-10 select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
          <div className="pt-9 py-4 px-8 text-white xl:w-[40rem]">
            <p className="mb-6 mt-1 text-3xl font-semibold leading-10">
              Reset your password
              <span className="abg-white whitespace-nowrap py-2 text-cyan-300">
                {" "}
                securely
              </span>
              .
            </p>
            <p className="mb-4">
              Enter your new password below to regain access to your account.
            </p>
          </div>
          <Image
            alt="reset password illustration"
            src={ResetPasswordSvg}
            className="ml-8 w-11/12 max-w-lg py-5 rounded-lg object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
