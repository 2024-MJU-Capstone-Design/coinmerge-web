"use client";

import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import USDCLogo from "../../../../assets/images/logos/USD Coin (USDC).png";
import BTCLogo from "../../../../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../../../../assets/images/logos/Ethereum (ETH).png";
import USDTLogo from "../../../../assets/images/logos/Tether (USDT).png";
import Image from "next/image";

const data = [
  { name: "USDC", value: 100.24, logo: USDCLogo },
  { name: "USDT", value: 200.24, logo: USDTLogo },
  { name: "Bitcoin", value: 900.25, logo: BTCLogo },
  { name: "Ethereum", value: 200, logo: ETHLogo },
];

const TOTAL_AMOUNT = data.reduce((acc, prev): number => {
  return acc + prev.value;
}, 0);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#262525"];

const RADIAN = Math.PI / 180;

const PortfolioPieGraph = () => {
  return (
    <div className="flex items-center ">
      <ResponsiveContainer width={200} height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div>
        <ul className="flex flex-col p-4 bg-base-200 gap-3 rounded-box">
          {data.map((token) => {
            return (
              <li key={token.name} className="flex gap-3 items-center">
                <Image width={20} alt="token logo" src={token.logo} />
                <p className="font-bold">{token.name}</p>
                <p className="font-light text-[12px]">
                  ${token.value} (
                  {((token.value / TOTAL_AMOUNT) * 100).toFixed(2)}%)
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
