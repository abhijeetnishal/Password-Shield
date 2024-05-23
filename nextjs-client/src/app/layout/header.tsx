'use client'
import headerLock from '../../public/assets/lockHeader.png'
import profilePhoto from '../../public/assets/user-profile.png'
import { Cookies } from "react-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const cookies = new Cookies();
  const cookieValue = cookies.get('myCookie');
  const userName = cookieValue?.userName;


  const logout = () => {
    const fetchData = async () => {
      // get the data from the api
      await fetch(`${process.env.REACT_APP_HOST_URL}/auth/logout`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
    }
    fetchData();
    cookies.remove('myCookie', { path: '/' });

    window.localStorage.clear();
    redirect("/");
  };

  return (
    <div data-testid="header" className=" bg-cyan-500 w-full text-white  px-4 flex flex-row justify-between items-center h-16">
      {!userName ? (
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flew-row items-end">
          <Image className="w-6 h-8" src={headerLock} alt="" />
          <Link className="ml-2" href="/">Key Safe</Link>
          </div>
          <Link className="border p-2 rounded" href="/login">Login</Link>
        </div>
      ) : (
        <div className="bg-cyan-500 w-full text-white  px-4 flex flex-row justify-between items-center h-16">
          <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex flew-row items-end'>
          <Image className="w-6 h-8"  src={headerLock} alt="" />
          <Link className="ml-2" href="/">Key Safe</Link>
          </div>
          <div className="flex flex-row">
            <div className="">
              <Image className="" src={profilePhoto} alt="" />
              <div className="">  {userName} </div>
            </div>
              <button className="border p-2 rounded" onClick={logout}>Logout</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

