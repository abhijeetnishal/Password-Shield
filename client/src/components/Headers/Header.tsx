import headerLock from "@/public/assets/lockHeader.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div
      data-testid="header"
      className=" bg-cyan-500 w-full text-white  px-4 flex flex-row justify-between items-center h-16"
    >
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
    </div>
  );
}
