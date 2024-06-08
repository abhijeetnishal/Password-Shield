"use client";
import { useState } from "react";
import useFetch from "@/src/hooks/useFetch";
import { AuthService } from "@/src/services/AuthService";
import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [{ isLoading }, forgotPasswordAPI] = useFetch(null);

  const onHandleSubmit = () => {
    if (email === "") {
      setErrorMessage("Enter Email");
    } else {
      setErrorMessage("");
      forgotPasswordAPI(() =>
        AuthService.forgotPassword({ email }).then((response) => {
          if (response.code === 200) {
            setSuccessMessage("Reset link has been sent to your email");
          } else {
            setErrorMessage(response.message);
          }
        })
      );
    }
  };

  return (
    <div
      style={{ height: "80vh" }}
      className="flex flex-col items-center justify-center"
    >
      <div className="bg-white p-12 rounded shadow m-2 flex flex-col w-4/5 lg:w-1/3 mt-6">
        <h1 className="text-3xl self-center mb-8">Forgot Password</h1>
        <input
          className="border rounded m-2 h-12 p-2 shadow-sm "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button
          onClick={onHandleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-400 border rounded m-2 h-12 p-2 shadow-sm"
        >
          Submit
        </button>

        {isLoading ? (
          <div className="w-full flex justify-center">
            <LoadingSpinner />
          </div>
        ) : null}

        {errorMessage && (
          <div className="text-red-500 font-semibold w-full flex justify-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-green-500 font-semibold w-full flex justify-center">
            {successMessage}
          </div>
        )}

        <div className="text-center mt-4">
          <Link className="text-teal-600 hover:underline" href="/auth/login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
