"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/src/hooks/useFetch";
import { AuthService } from "@/src/services/AuthService";
import LoadingSpinner from "@/src/components/Loaders/LoadingSpinner";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [{ isLoading }, resetPasswordAPI] = useFetch(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
  }, [searchParams]);

  const onHandleSubmit = () => {
    if (!password) {
      setErrorMessage("Enter Password");
    } else if (!confirmPassword) {
      setErrorMessage("Enter Confirm Password");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      resetPasswordAPI(() =>
        AuthService.resetPassword({ token, password }).then((response) => {
          if (response.code === 200) {
            setSuccessMessage("Password has been reset successfully");
            setTimeout(() => {
              router.push("/auth/login");
            }, 2000);
          } else {
            setErrorMessage(response.message);
          }
        })
      );
    }
  };

  return (
    <div style={{height:"90vh"}} className="flex flex-col items-center justify-center">
      <div className="bg-white p-5 rounded shadow m-2 flex flex-col w-4/5 lg:w-1/3 mt-1">
        <h1 className="text-3xl self-center mb-6">Reset Password</h1>
        <input
          className="border rounded m-2 h-12 p-2 shadow-sm mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <input
          className="border rounded m-2 h-12 p-2 shadow-sm mb-6"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
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
      </div>
    </div>
  );
};

export default ResetPassword;
