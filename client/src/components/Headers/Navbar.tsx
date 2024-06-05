"use client";

import useThemeStore from "@/src/store/themeStore";

import Link from "next/link";
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import Light from "../Icons/Light";
import Dark from "../Icons/Dark";

interface NavbarProps {
  landingPage: boolean;
}

const Navbar = (props: NavbarProps) => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`shadow-md  ${
        theme === "light" && props.landingPage
          ? "bg-[#f7f6ee]  text-black"
          : theme === "light"
          ? "bg-white  text-black"
          : "bg-[#12141d] text-white"
      } `}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="" className="h-8" alt="KeySafe Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            KeySafe.
          </span>
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
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul
            className={`font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg ${
              theme === "light"
                ? "bg-gray-50 md:bg-transparent"
                : "bg-[#12141d] md:bg-transparent"
            } md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0`}
          >
            {props.landingPage && (
              <>
                <li>
                  <ScrollLink to="/" smooth duration={500}>
                    <p
                      className="cursor-pointer block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                      aria-current="page"
                    >
                      Home
                    </p>
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="about" smooth duration={500}>
                    <p
                      className={`block py-2 px-3 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      } cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}
                    >
                      About
                    </p>
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="contact" smooth duration={500}>
                    <p
                      className={`block py-2 px-3 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      } cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}
                    >
                      Contact
                    </p>
                  </ScrollLink>
                </li>
                <li>
                  <Link href="/auth/register">
                    <p
                      className={`block py-2 px-3 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}
                    >
                      Register
                    </p>
                  </Link>
                </li>
                <li>
                  <Link data-testid="Login-link" href="/auth/login">
                    <button className="border-blue-700 border hover:bg-blue-700 hover:text-white hover:ring rounded px-3 py-1 text-blue-700 bg-transparent">
                      Login
                    </button>
                  </Link>
                </li>
              </>
            )}
            <li>
              <button className="p-1 md:mt-0 mt-2" onClick={toggleTheme}>
                {theme === "light" ? <Light /> : <Dark />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
