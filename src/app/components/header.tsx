"use client";
import Image from "next/image";
import Link from "next/link";
import { FiTrello } from "react-icons/fi";

import coinMergeImage from "../../assets/images/coinMerge.png";
import { useState } from "react";

const Header = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="sticky backdrop-blur-lg top-0 border-b-[0.5px] border-b-slate-800 z-100">
      <div className="m-auto max-w-[1400px] w-full flex flex-row gap-2 items-center justify-between p-2">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex flex-row items-center justify-center gap-1"
          >
            <Image width={45} src={coinMergeImage} alt="coin merge icon" />
            <p className="text-xl text-white font-bold">코인머지</p>
          </Link>
        </div>
        <div>
          <div className="ml-4 flex flex-row gap-4 items-center">
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
              <li>
                <Link href={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  홈으로
                </Link>
              </li>
              <li>
                <Link href={"/portfolio"}>
                  <FiTrello />
                  포트폴리오
                  <span className="badge badge-sm badge-warning">NEW</span>
                </Link>
              </li>
              <li>
                <Link href={"/leaderboard"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  리더보드
                </Link>
              </li>
            </ul>
            {!user && <Link href="/signin" className="btn btn-warning">로그인 하기</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
