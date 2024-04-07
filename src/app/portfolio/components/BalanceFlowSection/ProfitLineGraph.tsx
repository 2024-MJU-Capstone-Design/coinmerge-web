"use client";

import CustomAxisTick from "@/app/components/CustomAxisTick";
import { numberWithCommas } from "@/modules/helpers";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const balanceData = faker.date
  .betweens({
    from: new Date("2024-01-01"),
    to: new Date("2024-04-01"),
    count: 100,
  })
  .map((item) => {
    return {
      date: item,
      amount: faker.number.int({ min: 100000, max: 110000 }),
    };
  });

const profitRateData = faker.date
  .betweens({
    from: new Date("2024-01-01"),
    to: new Date("2024-04-01"),
    count: 100,
  })
  .map((item) => {
    return {
      date: item,
      amount: faker.number.int({ min: -20.24, max: 202.16 }),
    };
  });

enum GRAPH_TYPE {
  수익률,
  자산,
}

const ProfitLineGraph = () => {
  const [graphType, setGraphType] = useState(GRAPH_TYPE.자산);

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
          data={graphType === GRAPH_TYPE.자산 ? balanceData : profitRateData}
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
                      {dayjs(tooltipPayload?.date).format("YYYY.MM.DD")}
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
                        : `$${numberWithCommas(tooltipPayload?.amount)}`}
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
    </>
  );
};

export default ProfitLineGraph;
