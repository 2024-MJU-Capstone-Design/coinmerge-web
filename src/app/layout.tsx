import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";
import GlobalModal from "./components/GlobalModal";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import dynamic from 'next/dynamic'

const DynamicHeaderWithNoSSR = dynamic(
  () => import('./components/Header'),
  { ssr: false } // <-- not including this component on server-side
)

const DynamicFooterWithNoSSR = dynamic(
  () => import('./components/Footer'),
  { ssr: false } // <-- not including this component on server-side
)

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "코인머지",
  description: "코인 자산 통합 관리 플랫폼, 코인머지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className}`}>
          <DynamicHeaderWithNoSSR />
          <div className="max-w-[1400px] min-h-[calc(100vh-69px)] w-full m-auto">
            {children}
          </div>
          <DynamicFooterWithNoSSR />
          <GlobalModal />
      </body>
    </html>
  );
}
