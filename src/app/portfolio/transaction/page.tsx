"use client";

import { EXCHANGES, TOKENS } from "@/modules/constants";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import dayjs from "dayjs";

import { BiTransfer } from "react-icons/bi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { TransactionType } from "@/modules/types";
import Image from "next/image";

faker.seed(123);

const CURRENT_USDT_PRICE = 1.01;
const CURRENT_USDC_PRICE = 0.99;
const CURRENT_ETH_PRICE = 3383.98;
const CURRENT_BTC_PRICE = 69224.5;

const data = faker.date
  .betweens({
    from: new Date("2024-01-01"),
    to: new Date("2024-04-01"),
    count: 100,
  })
  .map((item) => {
    return {
      timestamp: item,
      events: [
        {
          exchange: EXCHANGES.binance,
          type: faker.number.int(1000) % 2 == 1 ? "deposit" : "withdraw",
          amount: faker.number.float({ min: 10.24, max: 100.25 }).toFixed(2),
          token: TOKENS.USDC,
          currentPrice: CURRENT_USDC_PRICE,
        },
        {
          exchange: EXCHANGES.bithumb,
          type: "swap",
          token: TOKENS.USDC,
          amount: faker.number.float({ min: 10.24, max: 100.25 }).toFixed(2),
          swapAmount: faker.number
            .float({ min: 0.0001, max: 0.006 })
            .toFixed(2),
          swapToken: TOKENS.BTC,
          currentPrice: CURRENT_BTC_PRICE,
        },
      ],
    };
  });

type TransactionMenuType = "all" | "deposit" | "withdraw" | "swap";

const TransactionItemConfig: { [key in TransactionType]: any } = {
  deposit: {
    color: "#35DA9E",
    icon: <FaArrowDown />,
    name: "입금",
  },
  withdraw: {
    color: "#f93535",
    icon: <FaArrowUp />,
    name: "출금",
  },
  swap: {
    color: "#3F87F4",
    icon: <BiTransfer />,
    name: "스왑",
  },
};

const Transaction = () => {
  const [menu, setMenu] = useState<TransactionMenuType>("all");

  const onClickMenu = (newMenu: TransactionMenuType) => {
    setMenu(newMenu);
  };

  return (
    <div className="p-4 h-full">
      <h3 className="flex font-bold text-[24px] items-center gap-4 mb-3">
        <GrTransaction size={30} /> 거래내역
      </h3>
      <nav className="flex mb-3 justify-end">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li>
            <button
              className={`${menu === "all" ? "focus" : ""}`}
              onClick={() => onClickMenu("all")}
            >
              모두 보기
            </button>
          </li>
          <li>
            <button
              className={`${menu === "deposit" ? "focus" : ""}`}
              onClick={() => onClickMenu("deposit")}
            >
              입금
            </button>
          </li>
          <li>
            <button
              className={`${menu === "withdraw" ? "focus" : ""}`}
              onClick={() => onClickMenu("withdraw")}
            >
              출금
            </button>
          </li>
          <li>
            <button
              className={`${menu === "swap" ? "focus" : ""}`}
              onClick={() => onClickMenu("swap")}
            >
              스왑
            </button>
          </li>
        </ul>
      </nav>
      {data.map((item) => {
        return (
          <div key={item.timestamp.toString()} className="mb-4">
            <p className="font-bold text-gray-300 mb-4">
              {dayjs(item.timestamp).format("YYYY.MM.DD")}
            </p>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Assets</th>
                  <th>Current Value</th>
                  <th>P/L</th>
                  <th>Exchange</th>
                </tr>
              </thead>
              <tbody>
                {item.events.map((event, index) => {
                  return (
                    <tr key={`${item}-${index}`}>
                      <td className="flex items-center gap-2">
                        <div
                          className={`rounded-box p-3 bg-opacity-15 bg-${event.type}`}
                        >
                          {
                            TransactionItemConfig[event.type as TransactionType]
                              .icon
                          }
                        </div>
                        <p className={`text-${event.type}`}>
                          {
                            TransactionItemConfig[event.type as TransactionType]
                              .name
                          }
                        </p>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <div className="badge badge-outline p-3 flex gap-2">
                            <Image
                              width={16}
                              height={16}
                              src={
                                event.swapToken
                                  ? event.swapToken.logo
                                  : event.token.logo
                              }
                              alt={
                                event.swapToken
                                  ? event.swapToken.symbol
                                  : event.token.symbol
                              }
                            />
                            <pre className="font-light text-sm">
                              {event.amount}
                              <b className="text-xs">
                                {" "}
                                (${event.token.price * Number(event.amount)})
                              </b>
                            </pre>
                          </div>
                        </div>
                      </td>
                      <td className="font-light text-[12px]">
                        $
                        {(event.currentPrice * Number(event.amount)).toFixed(2)}
                      </td>
                      <td>
                        <p
                          className={`${
                            event.currentPrice > event.token.price
                              ? "text-deposit"
                              : "text-withdraw"
                          }`}
                        >
                          $
                          {(
                            event.currentPrice * Number(event.amount) -
                            event.token.price * Number(event.amount)
                          ).toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <Image
                          width={60}
                          src={event.exchange.logo}
                          alt={event.exchange.name}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Transaction;
