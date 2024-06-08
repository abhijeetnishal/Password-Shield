"use client";
import useThemeStore from '@/src/store/themeStore';
import React, { useState } from 'react';
import Light from '../Icons/Light';
import Dark from '../Icons/Dark';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useAuthStore from '@/src/store/authStore';
import useProfileStore from '@/src/store/profileStore';

interface NavbarProps {
  landingPage: boolean;
}

const AuthNavbar: React.FC<NavbarProps> = ({ landingPage }) => {
  
  const profile = useProfileStore((state) => state.profileDetails);

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setProfile = useProfileStore((state) => state.setProfileDetails);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <nav className={`shadow-md ${theme === 'light' ? 'bg-white text-black' : 'bg-[#141414] text-white'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <div className="flex justify-evenly items-center">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">KeySafe.</span>
          </a>
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
            <>
              <li>
                <button className='px-3 py-1 bg-[#292929] hover:ring-1 border border-gray-600 text-white ring-gray-600 rounded-md'>
                  Logout
                </button>
              </li>
              {profile && profile.name ? (
                <li>
                  <button className='p-1 md:mt-0 mt-2' onClick={toggleTheme}>
                    {theme === 'light' ? <Light /> : <Dark />}
                  </button>
                </li>
              ) : null}
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
