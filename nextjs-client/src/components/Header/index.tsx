"use client";
import headerLock from "@/public/assets/lockHeader.png";
import profilePhoto from "@/public/assets/user-profile.png";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import useAuthStore from "@/src/store/authStore";
import useProfileStore from "@/src/store/profileStore";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const router = useRouter();
  const token = useAuthStore((state) => state.authToken);
  const profile = useProfileStore((state) => state.profileDetails);

  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setProfile = useProfileStore((state) => state.setProfileDetails);

  const logout = async () => {
    deleteCookie("token");
    router.replace("/auth/login");

    setAuthToken("");
    setProfile({});
  };

  return (
    <div
      data-testid="header"
      className=" bg-cyan-500 w-full text-white  px-4 flex flex-row justify-between items-center h-16"
    >
      {!token ? (
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flew-row items-end">
            <Image className="w-6 h-8" src={headerLock} alt="" />
            <Link className="ml-2" href="/">
              Key Safe
            </Link>
          </div>
          <Link className="border p-2 rounded" href="/auth/login">
            Login
          </Link>
        </div>
      ) : (
        <div className="bg-cyan-500 w-full text-white  px-4 flex flex-row justify-between items-center h-16">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flew-row items-end">
              <Image className="w-6 h-8" src={headerLock} alt="" />
              <Link className="ml-2" href="/">
                Key Safe
              </Link>
            </div>
            <div className="flex flex-row">
              <div className="">
                <Image className="" src={profilePhoto} alt="" />
                <div className=""> {profile.name} </div>
              </div>
              <button className="border p-2 rounded" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
