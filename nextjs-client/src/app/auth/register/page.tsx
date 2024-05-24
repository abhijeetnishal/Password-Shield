"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../layout/loadingSpinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useFetch from "@/src/hooks/useFetch";
import { AuthService } from "@/src/services/AuthService";
import { setCookie } from "cookies-next";
import useAuthStore from "@/src/store/authStore";
import useProfileStore from "@/src/store/profileStore";
import { ProfileService } from "@/src/services/ProfileService";

const Register = () => {
  const router = useRouter();
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setProfile = useProfileStore((state) => state.setProfileDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [
    {
      data: registerData,
      isLoading: isRegisterLoading,
      isError: isRegisterError,
    },
    getRegisterAPI,
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
    const { code } = registerData;

    if (code === 200) {
      const { data } = registerData;
      const token = data.token;

      setCookie("token", token);
      setAuthToken(token);

      getUserDetailsAPI(() => () => ProfileService.getUserProfile(token));
    }
  }, [registerData, isRegisterError]);

  useEffect(() => {
    const { code } = userDetailsData;

    if (code === 200) {
      const { data } = userDetailsData;
      setProfile(data);

      router.push("/dashboard");
    }
  }, [userDetailsData, isUserDetailsError]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onHandleSubmit = () => {
    if (name === "") {
      setErrorMessage("Enter name");
    } else if (!validateEmail(email)) {
      setErrorMessage("Enter correct email");
    } else if (password === "") {
      setErrorMessage("Enter Password");
    } else {
      getRegisterAPI(
        () => () =>
          AuthService.emailSignUp({ name: name, email, password: password })
      );
    }
  };

  return (
    <div data-testid="register" className="">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-5  rounded shadow m-2 flex flex-col w-4/5 lg:w-1/3 mt-16">
          <h1 className="text-3xl self-center">Register</h1>
          <input
            className="border rounded m-2 h-12 p-2 shadow-sm"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
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
            disabled={isRegisterLoading}
            className="w-full bg-blue-400 border rounded m-2 h-12 p-2 shadow-sm"
          >
            Submit
          </button>

          {errorMessage ? <div>{errorMessage}</div> : null}

          {isRegisterLoading ? <LoadingSpinner /> : null}
        </div>
        <div className="flex flex-col items-center mt-12">
          <p className="">
            Already have an account?{" "}
            <span>
              <Link className="text-teal-600 hover:underline" href="/login">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
