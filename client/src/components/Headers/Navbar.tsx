"use client";
import { useThemeContext } from '@/src/app/layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={` ${theme === 'light' ? 'bg-white text-black' : 'bg-[#12141d] text-white'} `}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="" className="h-8" alt="KeySafe Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap">KeySafe.</span>
        </a>
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
          <ul className={`font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg ${theme === 'light' ? 'bg-gray-50 md:bg-transparent' : 'bg-[#12141d] md:bg-transparent'} md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0`}>
            <li>
              <ScrollLink to='/' smooth duration={500}>
                <p className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Home</p>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to='about' smooth duration={500}>
                <p className={`block py-2 px-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>About</p>
              </ScrollLink>
            </li>
            {/* <li>
              <ScrollLink to='' smooth duration={500}>
                <p className={`block py-2 px-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Services</p>
              </ScrollLink>
            </li> */}
            <li>
              <ScrollLink to='contact' smooth duration={500}>
                <p className={`block py-2 px-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Contact</p>
              </ScrollLink>
            </li>
            <li>
              <Link href='/auth/register'>
                <p className={`block py-2 px-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Register</p>
              </Link>
            </li>
            <li>
              <Link data-testid="Login-link" href='/auth/login'>
                <button className='border-blue-700 border hover:bg-blue-700 hover:text-white hover:ring rounded px-3 py-1 text-blue-700 bg-transparent'>
                  Login
                </button>
              </Link>
            </li>
            <li>
              <button className='p-1 md:mt-0 mt-2' onClick={toggleTheme}>
                {
                  theme === 'light' && 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001zm-7.001 22c-6.617 0-12-5.383-12-12s5.383-12 12-12c1.894 0 3.63.497 5.37 1.179-2.948.504-9.37 3.266-9.37 10.821 0 7.454 5.917 10.208 9.37 10.821-1.5.846-3.476 1.179-5.37 1.179z"/></svg>
                }
                {
                  theme === 'dark' && 
                  <svg xmlns="http://www.w3.org/2000/svg" color='white'  fill='white' width="24" height="24" viewBox="0 0 24 24"><path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm2.312-4.897c0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4-4 1.794-4 4zm10 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z"/></svg>
                }
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
