"use client";

import { EXCHANGES, TOKENS } from "@/modules/constants";
import { de, faker } from "@faker-js/faker";
import { useState } from "react";
import { GrTransaction } from "react-icons/gr";
import dayjs from "dayjs";

import { BiTransfer } from "react-icons/bi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import Image from "next/image";
import { TokenType, TransactionType } from "@/types/domain";
import { useUserStore } from "@/stores/userStore";
import { useAppStore } from "@/stores/appStore";
import { Exchange } from "@/types/api";

type TransactionMenuType = "all" | "deposit" | "withdraw" | "swap";

const TransactionItemConfig = {
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

interface TransactionEvent {
  timestamp: string;
  token: string;
  swapToken: string | null;
  currentTokenPrice: number;
  currentSwapTokenPrice: number | null;
  amount: string;
  toAmount: string | null;
  exchange: Exchange;
  type: "deposit" | "withdraw" | "swap";
}

interface TransactionList {
  [key: string]: TransactionEvent[];
}

const Transaction = () => {
  const [menu, setMenu] = useState<TransactionMenuType>("all");
  const assets = useUserStore((state) => state.assets);
  const tokenPrices = useAppStore((state) => state.tokenPrices);

  let transactions: TransactionEvent[] =
    assets?.depositAndWithdraws.map((depositAndWithdraw) => {
      return {
        timestamp: dayjs(depositAndWithdraw?.timeStamp ?? 0).format(
          "YYYY.MM.DD"
        ),
        token: depositAndWithdraw.tokenId,
        swapToken: null,
        currentTokenPrice:
          Number(
            tokenPrices.find(
              (token) => token.symbol == depositAndWithdraw.tokenId
            )?.lastPrice
          ) * Number(depositAndWithdraw.amount),
        currentSwapTokenPrice: null,
        type: depositAndWithdraw.type === 0 ? "deposit" : "withdraw",
        amount: depositAndWithdraw.amount,
        toAmount: null,
        exchange: depositAndWithdraw.exchange,
      };
    }) ?? [];

  transactions = transactions?.concat(
    assets?.transactions.map((transaction) => {
      return {
        timestamp: dayjs(transaction?.timeStamp ?? 0).format("YYYY.MM.DD"),
        token: transaction.fromTokenId,
        swapToken: transaction.toTokenId,
        currentTokenPrice:
          Number(
            tokenPrices.find((token) => token.symbol == transaction.fromTokenId)
              ?.lastPrice
          ) * Number(transaction.fromAmount),
        currentSwapTokenPrice:
          Number(
            tokenPrices.find((token) => token.symbol == transaction.toTokenId)
              ?.lastPrice
          ) * Number(transaction.toAmount),
        type: "swap",
        amount: transaction.fromAmount,
        toAmount: transaction.toAmount,
        exchange: transaction.exchange,
      };
    }) ?? []
  );

  const transactionList: TransactionList = {};

  transactions.filter(transaction => {
    if(menu === "all") {
      return transaction;
    }else {
      if(menu === "deposit"){
        if(transaction.type == "deposit"){
          return transaction;
        }
      }else if(menu === "withdraw") {
        if(transaction.type === "withdraw"){
          return transaction;
        }
      }else if(menu === "swap"){
        if(transaction.type === "swap"){
          return transaction;
        }
      }
    }
  }).forEach((transaction) => {
    const timestamp = transaction.timestamp;
    const transactionValue = transaction;

    if (!transactionList[timestamp]) {
      transactionList[timestamp] = [];
    }

    transactionList[timestamp].push(transactionValue);
  });

  const sortedTransactionList = Object.keys(transactionList)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((timestamp) => ({
      timestamp: timestamp,
      values: transactionList[timestamp],
    }));

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
      {sortedTransactionList.map((item) => {
        return (
          <div key={item.timestamp} className="mb-4">
            <p className="font-bold text-gray-300 mb-4">{item.timestamp}</p>
            <table className="table table-md table-auto">
              {/* head */}
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Assets</th>
                  <th>Current Value</th>
                  <th>Exchange</th>
                </tr>
              </thead>
              <tbody>
                {item.values.map((event, index) => {
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
                              src={TOKENS[event.token as TokenType]?.logo}
                              alt={event.token}
                            />
                            <pre className="font-light text-sm">
                              {event.amount}
                            </pre>
                            {event.type == "swap" && (
                              <>
                                {
                                  TransactionItemConfig[
                                    event.type as TransactionType
                                  ].icon
                                }
                                <Image
                                  width={16}
                                  height={16}
                                  src={
                                    TOKENS[event.swapToken as TokenType].logo
                                  }
                                  alt={event.swapToken ?? ""}
                                />
                                <pre className="font-light text-sm">
                                  {event.toAmount}
                                </pre>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="font-light text-[12px]">
                        ${Number(event.type === "swap" ? event.currentSwapTokenPrice : event.currentTokenPrice).toFixed(2)}
                      </td>
                      <td>
                        <Image
                          width={60}
                          height={30}
                          src={event.exchange.logo}
                          alt={event.exchange.nameKor}
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
