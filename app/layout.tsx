// app/layout.tsx
"use client";

import React, { useLayoutEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Navigation from '@/components/Navigation';
import CVLink from '@/components/CV';
import SplineComponent from '@/components/Spline';
import { usePathname } from 'next/navigation';
import HideIt from '@/components/HideWaterMark';
import LoadingIndicator from '@/components/LoadingIndicator'; // Import the loading indicator
import TextWithImage from '@/components/TextImage';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);

    // Check if the document is already loaded
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      // Otherwise, add the load event listener
      window.addEventListener("load", handleLoad);
    }

    // Clean up event listener on component unmount
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Show loading indicator while the page is loading */}
        {!isPageLoaded && <LoadingIndicator />}

        {children}

        {/* Conditionally render Navigation, CVLink, and Navbar after page load */}
        {isPageLoaded && (
          <>
            <Navbar />
            <Navigation />
            <CVLink />
            {/* Render SplineComponent only on the homepage */}
            {pathname === '/' && <SplineComponent />}
            {pathname === '/' && <HideIt />}
            {pathname === '/' && <TextWithImage />}
          </>
        )}
      </body>
    </html>
  );
}
