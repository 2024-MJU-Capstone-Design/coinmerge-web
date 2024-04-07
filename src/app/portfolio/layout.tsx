"use client";
import { FaRobot, FaChartPie } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";
import dayjs from "dayjs";

import { PropsWithChildren, useState } from "react";
import Link from "next/link";
import Image from "next/image";

enum MENU {
  홈,
}

const Layout = ({ children }: PropsWithChildren) => {
  const [currentMenu] = useState();
  return (
    <div className="flex p-4 gap-4 items-start">
      <div className="flex flex-col gap-4">
        <ul className="menu w-56 bg-base-200 rounded-box">
          <li className="focus">
            <Link href="/portfolio">
              <FaChartPie />홈
            </Link>
          </li>
          <li>
            <Link href="/portfolio/analysis">
              <FaRobot />
              코인머지 AI
              <span className="badge badge-sm badge-warning">NEW</span>
            </Link>
          </li>
          <li>
            <Link href="/portfolio/transaction">
              <GrTransaction />
              거래 내역
            </Link>
          </li>
        </ul>
        <section className="flex flex-col w-56 items-center bg-base-200 rounded-box p-4 gap-2">
          <Image
            className="rounded-full"
            width={60}
            height={60}
            src={"https://avatars.githubusercontent.com/u/19343421"}
            alt="user profile"
          />
          <p className="font-bold text-[24px]">Frank</p>
          <button className="btn btn-xs btn-outline">
            <IoCopyOutline />
            Copy Portfolio Link
          </button>
          <pre className="font-light text-[12px] whitespace-pre-line text-gray">
            비트 맥시멀리스트 입니다.{"\n"}자산 비중을 일반적으로 비트 80% 이상
            보유하고, 나머지 고 변동 알트코인으로 구성합니다.
          </pre>
        </section>
        <section className="flex flex-col w-56 bg-base-200 rounded-box p-4 gap-2">
          <div>
            <p className="font-light text-gray-300 text-[12px]">조회 수</p>
            <p className="font-light text-[12px]">2312 회</p>
          </div>
          <div>
            <p className="font-light text-gray-300 text-[12px]">가입 일</p>
            <p className="font-light text-[12px]">
              {dayjs().format("YYYY.MM.DD")}
            </p>
          </div>
        </section>
      </div>

      <div className="bg-base-200 w-full rounded-box p-4  h-[calc(100vh-120px)] flex flex-col overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;
