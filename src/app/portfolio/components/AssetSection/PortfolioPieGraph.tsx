"use client";

import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import USDCLogo from "../../../../assets/images/logos/USD Coin (USDC).png";
import BTCLogo from "../../../../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../../../../assets/images/logos/Ethereum (ETH).png";
import USDTLogo from "../../../../assets/images/logos/Tether (USDT).png";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import { Asset } from "@/types/api";
import { useAppStore } from "@/stores/appStore";

export const BITHUMB_DUMMY_DATA: Asset[] = [
  {
    id: 10124124,
    token: {
      id: "BTC",
      logo: BTCLogo.src,
      nameKo: "비트코인",
      nameEng: "Bitcoin",
    },
    amount: 0.013,
    exchange: {
      id: 1,
      nameEng: "Bithumb",
      nameKor: "빗썸",
      logo: "",
    },
  },
  {
    id: 10124126,
    token: {
      id: "ETH",
      logo: ETHLogo.src,
      nameKo: "이더리움",
      nameEng: "Ethereum",
    },
    amount: 0.013,
    exchange: {
      id: 1,
      nameEng: "Bithumb",
      nameKor: "빗썸",
      logo: "",
    },
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#32bd8a",
  "#FFBB28",
  "#262525",
  "#b72121",
];

const RADIAN = Math.PI / 180;

const PortfolioPieGraph = () => {
  const [assets] = useUserStore((state) => [state.assets]);
  const tokenPrices = useAppStore((state) => state.tokenPrices);
  const pieAssets = [...(assets?.assets ?? []), ...BITHUMB_DUMMY_DATA].map(
    (asset) => {
      const targetPrice = tokenPrices.find(
        (price) => price.symbol == asset.token.id
      );

      return {
        ...asset,
        value: Number(targetPrice?.lastPrice) * asset.amount,
      };
    }
  );
  const totalAmount = pieAssets.reduce((acc, cur) => {
    const targetPrice = tokenPrices.find(
      (price) => price.symbol == cur.token.id
    );
    return acc + cur.amount * Number(targetPrice?.lastPrice);
  }, 0);

  return (
    <div className="flex items-center ">
      <ResponsiveContainer width={200} height={280}>
        <PieChart>
          <Pie
            data={pieAssets}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieAssets.map((asset, index) => (
              <Cell
                key={`cell-${asset.id}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div>
        <ul className="flex flex-col p-4 bg-base-200 gap-3 rounded-box">
          {pieAssets.map((asset) => {

            return (
              <li key={asset.token.id} className="flex gap-3 items-center">
                <Image
                  width={20}
                  height={20}
                  alt="token logo"
                  src={asset.token.logo}
                />
                <p className="font-bold">{asset.token.id}</p>
                <p className="font-light text-[12px]">({asset.exchange.nameKor})</p>
                <p className="font-light text-[12px]">
                  ${asset.value.toFixed(2)} ({((asset.value / totalAmount) * 100).toFixed(2)}
                  %)
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioPieGraph;
