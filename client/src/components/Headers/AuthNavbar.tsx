"use client";

import useThemeStore from '@/src/store/themeStore';

import Link from 'next/link';
import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Light from '../Icons/Light';
import Dark from '../Icons/Dark';

interface NavbarProps {
  landingPage: boolean;
}


const AuthNavbar: React.FC<NavbarProps> = ({ landingPage }) => {

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`shadow-md  ${theme === 'light' ? 'bg-white  text-black' : 'bg-[#141414] text-white'} `}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px- py-3">
        <div className="flex justify-evenly items-center">

          <a href="/" className="flex items-center  space-x-3 rtl:space-x-reverse">
            {/* <img src="" className="h-8" alt="KeySafe Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap">KeySafe.</span>
          </a>

          {/* <button className=' ml-16 mx-5 px-5 bg-[#292929] hover:ring-1 text-[#73D285] ring-gray-600  rounded-md  py-1 '>
            Add
          </button> */}
          {/* <button className=' px-5 hover:bg-[black] hover:text-white hover:ring-1 bg-[#1b1b1b] ring-gray-600  rounded  py-1 text-white bg-transparent'>
                      More
          </button> */}

        </div>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`} id="navbar-default">

          <ul className={`font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg ${theme === 'light' ? 'bg-gray-50 md:bg-transparent' : 'bg-[#141414] md:bg-transparent'} md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0`}>
            {

              <>
                <li>
                  {/* <form className="flex items-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                      <input type="text" id="simple-search" className="bg-[#292929] border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2  " placeholder="Search Site name..." required />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-[#292929] rounded-lg border border-gray-700  focus:ring focus:outline-none focus:ring-blue-300 ">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </form> */}

                </li>

                <li>
                  <Link data-testid="Login-link" href='/auth/login'>
                  <button className=' px-3 py-1 bg-[#292929] hover:ring-1 border border-gray-600 text-[white] ring-gray-600  rounded-md   '>
           
            Logout
          </button>
                  </Link>
                </li>
              </>}
            <li>
              <button className='p-1 md:mt-0 mt-2' onClick={toggleTheme}>
                {
                  theme === 'light' ? <Light /> : <Dark />
                }
              </button>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
export default AuthNavbar;