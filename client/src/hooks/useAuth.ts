"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useFetch from "./useFetch";
import { ProfileService } from "@/src/services/ProfileService";
import { deleteCookie } from "cookies-next";
import useAuthStore from "@/src/store/authStore";
import useProfileStore from "@/src/store/profileStore";

interface userObject {
  redirectTo: string;
  token: string;
}

export default function useAuth({ redirectTo = "", token }: userObject) {
  const router = useRouter();

  const isAuth = useAuthStore((state) => state.authToken);
  const profile = useProfileStore((state) => state.profileDetails);

  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setProfile = useProfileStore((state) => state.setProfileDetails);

  let [{ data: user, isLoading, isError }, getMyDetails] = useFetch(null);

  useEffect(() => {
    // if no redirect needed, just return
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) return;

    if (user && user.code) {
      const { data: userDetails, code } = user;

      if (code === 200) {
        setProfile(userDetails);
      } else {
        // If the token was invalid we first remove it from cookie and then redirect
        deleteCookie("token");

        if (redirectTo !== "") {
          router.replace(redirectTo);
        }
        setAuthToken(null);
      }
    } else if (isError) {
      // If the token was invalid we first remove it from cookie and then redirect
      deleteCookie("token");

      if (redirectTo !== "") {
        router.replace(redirectTo);
      }
      setAuthToken(null);
    }
  }, [user, isError, redirectTo]);

  useEffect(() => {
    if (!token && redirectTo !== "") {
      router.replace(redirectTo);
    } else {
      if (!isAuth && token) {
        setAuthToken(token);
      }

      if (!profile.length) {
        getMyDetails(() => () => ProfileService.getUserProfile(token));
      }
    }
  }, []);
}
