"use client";

import CustomAxisTick from "@/app/components/CustomAxisTick";
import { numberWithCommas } from "@/modules/helpers";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import dayjs from "dayjs";
import React, { useState } from "react";
import { YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { BITHUMB_DUMMY_DATA } from "../AssetSection/PortfolioPieGraph";

enum GRAPH_TYPE {
  수익률,
  자산,
}

const ProfitLineGraph = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPE.자산);
  const assets = useUserStore((store) => store.assets);
  const tokenPrices = useAppStore(state => state.tokenPrices);

  const totalBithumbValue = BITHUMB_DUMMY_DATA.reduce((acc, cur) => {
    const targetPrice = tokenPrices.find(
      (price) => price.symbol == cur.token.id
    );
    return acc + cur.amount * Number(targetPrice?.lastPrice);
  }, 0);


  const snapshots = assets?.snapshots.map(snapshot => {
    
    return {
      ...snapshot,
      amount: Number(snapshot.amount) + totalBithumbValue
    }
  })

  const profitSnapshots = assets?.snapshots.map((snapshot, index) => {

    return {
      ...snapshot,
      amount:
        index == 0
          ? 0
          : ((Number(snapshot.amount) + totalBithumbValue) /
            (Number(assets.snapshots[index - 1].amount) + totalBithumbValue)).toFixed(2),
    };
  });

  const onClickMenu = (newGraphType: GRAPH_TYPE) => {
    setGraphType(newGraphType);
  };

  const formatBalanceYAxis = (value: string) => {
    if (Number(value) >= 1000) {
      return `$${Number(value) / 1000}K`;
    } else if (Number(value) <= -1000) {
      return `-$${Math.abs(Number(value) / 1000)}K`;
    }
    return `$${value}`;
  };

  const formatProfitRateYAxis = (value: string) => {
    return value + "%";
  };

  return (
    <>
      <div>
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6 mb-6 gap-2">
          <li>
            <button
              onClick={() => onClickMenu(GRAPH_TYPE.자산)}
              className={graphType === GRAPH_TYPE.자산 ? "focus" : ""}
            >
              자산
            </button>
          </li>
          <li className="">
            <button
              onClick={() => onClickMenu(GRAPH_TYPE.수익률)}
              className={graphType === GRAPH_TYPE.수익률 ? "focus" : ""}
            >
              수익률
            </button>
          </li>
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          width={500}
          data={
            graphType === GRAPH_TYPE.자산 ? snapshots : profitSnapshots
          }
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <YAxis
            tickSize={0}
            orientation="left"
            tick={
              <CustomAxisTick
                textAnchor="end"
                dx={-4}
                dy={0}
                format={
                  graphType === GRAPH_TYPE.자산
                    ? formatBalanceYAxis
                    : formatProfitRateYAxis
                }
              />
            }
          />
          <Tooltip
            content={(data) => {
              const tooltipPayload = data?.payload?.[0]?.payload;
              return (
                <div className="p-2 rounded-box flex flex-col bg-base-100 w-[200px]">
                  <ul className="flex flex-col items-center shadow-slate-900">
                    <p className="font-light text-gray-400 text-[12px]">
                      {dayjs(tooltipPayload?.timeStamp).format("YYYY.MM.DD")}
                    </p>
                    <p
                      className={`font-bold ${
                        tooltipPayload?.amount < 0
                          ? "text-red-500"
                          : "text-green-500"
                      } text-[18px]`}
                    >
                      {graphType === GRAPH_TYPE.수익률
                        ? `${tooltipPayload?.amount}%`
                        : `$${numberWithCommas(tooltipPayload?.amount?.toFixed(2))}`}
                    </p>
                  </ul>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            dot={false}
            stroke={graphType === GRAPH_TYPE.수익률 ? "#35DA9E" : "#3F87F4"}
            fill={graphType === GRAPH_TYPE.수익률 ? "#35DA9E" : "#3F87F4"}
            fillOpacity={0.3}
            activeDot={false}
          />
        </AreaChart>
        
      </ResponsiveContainer>
      <p className="text-gray-400 text-[12px]">자산 그래프는 오전 9시 기준으로 기록 된 결과입니다. 현재 자산과 차이가 날 수 있습니다.</p>
    </>
  );
};

export default ProfitLineGraph;
