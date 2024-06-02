"use client";

import CountUp from "react-countup";
import { GoGraph } from "react-icons/go";
import ProfitLineGraph from "./ProfitLineGraph";
import { useUserStore } from "@/stores/userStore";
import { BITHUMB_DUMMY_DATA } from "../AssetSection/PortfolioPieGraph";
import { useAppStore } from "@/stores/appStore";

const BalanceFlowSection = () => {
  const [assets] = useUserStore((store) => [store.assets]);
  const tokenPrices = useAppStore((state) => state.tokenPrices);
  const totalProfitRate =
    Number(assets?.snapshots[assets.snapshots.length - 2].amount) /
    Number(assets?.snapshots[0].amount);
  const thirtyDayProfitRate =
    Number(assets?.snapshots[0].amount) /
    Number(
      assets?.snapshots[
        assets.snapshots.length >= 30 ? 29 : assets.snapshots.length - 1
      ].amount
    );
  const oneDayProfitRate =
    Number(assets?.snapshots[assets.snapshots.length - 1].amount) /
    Number(
      assets?.snapshots[
        assets.snapshots.length >= 2
          ? assets.snapshots.length - 2
          : assets.snapshots.length - 1
      ].amount
    );
  const oneDayProfit =
    Number(assets?.snapshots[assets.snapshots.length - 1].amount) -
    Number(
      assets?.snapshots[
        assets.snapshots.length >= 2
          ? assets.snapshots.length - 2
          : assets.snapshots.length - 1
      ].amount
    );

  const totalBithumbValue = BITHUMB_DUMMY_DATA.reduce((acc, cur) => {
    const targetPrice = tokenPrices.find(
      (price) => price.symbol == cur.token.id
    );
    return acc + cur.amount * Number(targetPrice?.lastPrice);
  }, 0);

  return (
    <section className="p-4 rounded-box bg-base-100">
      <div className="flex items-center mb-5 gap-3">
        <h3 className="font-bold text-[24px]">수익 분석</h3>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-[12px] text-gray-400">현재 자산</p>
          <p className={`text-xl font-bold text-blue-500`}>
            $
            <CountUp
              decimals={2}
              end={Number(assets?.snapshots[0].amount ?? 0) + totalBithumbValue}
            />
          </p>
          <pre
            className={`text-[12px] ${
              oneDayProfit > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {oneDayProfit > 0 ? "+" : "-"}${Math.abs(oneDayProfit).toFixed(2)} (
            {oneDayProfit > 0 ? "+" : "-"}
            {oneDayProfitRate.toFixed(2)}%){" "}
            <p className="text-[8px] text-gray-400">(24시간 기준)</p>
          </pre>
        </div>
        <div className="flex items-start gap-4 w-[360px] justify-evenly">
          <div className="flex flex-col items-end w-[120px]">
            <p className="text-[12px] text-gray-400">24시간 수익률</p>
            <p
              className={`text-lg font-bold ${
                oneDayProfitRate > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {oneDayProfitRate > 0 && "+"}
              <CountUp decimals={2} end={oneDayProfitRate} />%
            </p>
          </div>
          <div className="flex flex-col items-end w-[120px]">
            <p className="text-[12px] text-gray-400">30일 수익률</p>
            <p
              className={`text-lg font-bold ${
                thirtyDayProfitRate > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {thirtyDayProfitRate > 0 && "+"}
              <CountUp decimals={2} end={thirtyDayProfitRate} />%
            </p>
          </div>
          <div className="flex flex-col items-end w-[120px]">
            <p className="text-[12px] text-gray-400">전체 수익률</p>
            <p className="text-lg font-bold text-green-500">
              {totalProfitRate > 0 && "+"}
              <CountUp decimals={2} end={totalProfitRate} />%
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
