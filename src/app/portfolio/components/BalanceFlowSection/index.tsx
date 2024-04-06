"use client";

import CountUp from "react-countup";
import { GoGraph } from "react-icons/go";
import ProfitLineGraph from "./ProfitLineGraph";

const BalanceFlowSection = () => {
  return (
    <section className="p-4 rounded-box bg-base-100">
      <div
        className="flex items-center mb-5 gap-3"
      >
        <GoGraph size={30} />
        <h3 className="font-bold text-[24px]">수익 분석</h3>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-[12px] text-gray-400">현재 자산</p>
          <p className="text-xl font-bold text-green-500">
            $<CountUp end={82900} />
          </p>
          <pre className="text-[12px] text-green-500">
            + $1,232 (+13.23%){" "}
            <p className="text-[8px] text-gray-400">(24시간 기준)</p>
          </pre>
        </div>
        <div className="flex items-start gap-4 w-[360px] justify-evenly">
          <div className="flex flex-col items-end w-[120px]">
            <p className="text-[12px] text-gray-400">24시간 수익률</p>
            <p className="text-lg font-bold text-green-500">
              +<CountUp decimals={2} end={52.24} />%
            </p>
          </div>
          <div className="flex flex-col items-end w-[120px]">
            <p className="text-[12px] text-gray-400">30일 수익률</p>
            <p className="text-lg font-bold text-red-500">
              -<CountUp decimals={2} end={23.19} />%
            </p>
          </div>
          <div className="flex flex-col items-end w-[120px]">
            <p className="text-[12px] text-gray-400">전체 수익률</p>
            <p className="text-lg font-bold text-green-500">
              +<CountUp decimals={2} end={512.4} />%
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <ProfitLineGraph />
      </div>
    </section>
  );
};

export default BalanceFlowSection;
