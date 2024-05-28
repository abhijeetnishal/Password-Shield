"use client"; // Mark the file as a client component

import { Inter } from "next/font/google";
import { createContext, useState, useContext, ReactNode, FC } from 'react';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



// Define the shape of the context value
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Create a provider component
const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default theme is 'light'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for easier usage of the context
const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// RootLayout component
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <main className="min-h-[85vh] bg-white">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export {useThemeContext};
