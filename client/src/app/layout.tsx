import { Inter } from "next/font/google";
import { ReactNode, FC } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Key Safe</title>
      </head>
      <body className={inter.className}>
        <main className="min-h-[85vh] bg-white">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
