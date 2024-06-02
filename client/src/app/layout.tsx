"use client"; 

import { Inter } from "next/font/google";
import { ReactNode, FC } from 'react';
import "./globals.css";
import useThemeStore from '../store/themeStore';
import useTitleStore from '../store/titleStore';

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const { theme } = useThemeStore();
  const { title } = useTitleStore();

  return (
    <html lang="en">
      <head>
      <title>{title}</title>
      </head>
      <body className={`${inter.className} ${theme === 'dark' ? 'dark' : 'light'}`}>
        <main className="min-h-[85vh] bg-white">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
