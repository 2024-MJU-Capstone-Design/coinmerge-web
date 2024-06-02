"use client";

import { TOKENS } from "@/modules/constants";
import { faker } from "@faker-js/faker";
import CountUp from "react-countup";
import DummyProfitLineGraph from "../components/BalanceFlowSection/DummyProfitLineGraph";
import BinanceLogo from "../../../assets/images/binance.png";
import BithumbLogo from "../../../assets/images/bithumb.png";
import DummyPortfolioPieGraph from "../components/AssetSection/DummyPortfolioPieGraph";
import Image from "next/image";
import { useAppStore } from "@/stores/appStore";

const dummyTokens = [
  [TOKENS.BTC, TOKENS.USDC],
  [TOKENS.BTC],
  [TOKENS.ETH],
  [TOKENS.USDT, TOKENS.USDC],
  [TOKENS.BTC, TOKENS.ETH, TOKENS.USDC, TOKENS.USDT],
];

const dummys = {
  nickname: faker.person.firstName(),
  amount: faker.number.float({
    min: 0.1,
    max: 100,
    fractionDigits: 2,
  }),
  profit: faker.number.float({
    min: -50,
    max: 50,
    fractionDigits: 2,
  }),
  dayProfitRate: faker.number.float({
    min: -50,
    max: 50,
    fractionDigits: 2,
  }),
  monthProfitRate: faker.number.float({
    min: -50,
    max: 50,
    fractionDigits: 2,
  }),
  totalProfitRate: faker.number.float({
    min: -50,
    max: 50,
    fractionDigits: 2,
  }),
  profile: faker.image.avatarGitHub(),
  tokens: dummyTokens[faker.number.int(4)],
};

const PortfolioCustom = () => {
  const tokenPrices = useAppStore((state) => state.tokenPrices);

  return (
    <div className="flex flex-col gap-5">
      <section className="p-4 rounded-box bg-base-100">
        <div className="flex items-center mb-5 gap-3">
          <h3 className="font-bold text-[24px]">수익 분석</h3>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <p className="text-[12px] text-gray-400">현재 자산</p>
            <p className={`text-xl font-bold text-blue-500`}>
              $
              <CountUp decimals={2} end={Number(dummys.amount)} />
            </p>
            <pre
              className={`text-[12px] ${
                dummys.profit > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {dummys.profit > 0 ? "+" : "-"}$
              {Math.abs(dummys.profit).toFixed(2)} (
              {dummys.profit > 0 ? "+" : "-"}
              12.23% )<p className="text-[8px] text-gray-400">(24시간 기준)</p>
            </pre>
          </div>
          <div className="flex items-start gap-4 w-[360px] justify-evenly">
            <div className="flex flex-col items-end w-[120px]">
              <p className="text-[12px] text-gray-400">24시간 수익률</p>
              <p
                className={`text-lg font-bold ${
                  dummys.dayProfitRate > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {dummys.dayProfitRate > 0 && "+"}
                <CountUp decimals={2} end={dummys.dayProfitRate} />%
              </p>
            </div>
            <div className="flex flex-col items-end w-[120px]">
              <p className="text-[12px] text-gray-400">30일 수익률</p>
              <p
                className={`text-lg font-bold ${
                  dummys.monthProfitRate > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {dummys.monthProfitRate > 0 && "+"}
                <CountUp decimals={2} end={dummys.monthProfitRate} />%
              </p>
            </div>
            <div className="flex flex-col items-end w-[120px]">
              <p className="text-[12px] text-gray-400">전체 수익률</p>
              <p className="text-lg font-bold text-green-500">
                {dummys.totalProfitRate > 0 && "+"}
                <CountUp decimals={2} end={dummys.totalProfitRate} />%
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <DummyProfitLineGraph />
        </div>
      </section>
      <section className="p-4 rounded-box bg-base-100">
        <div className="flex items-center mb-5 gap-3">
          <h3 className="font-bold text-[24px]">자산 구성</h3>
        </div>
        <div className="w-full">
          <DummyPortfolioPieGraph />
        </div>
        <h3 className="font-bold text-[20px] mb-3">거래소 별 자산 확인하기</h3>
        <div>
          <div className="overflow-x-auto">
            <Image width={120} alt="binance assets" src={BinanceLogo} />
            <table className="table mb-5">
              {/* head */}
              <thead>
                <tr>
                  <th>토큰</th>
                  <th>티커</th>
                  <th>보유 수량</th>
                </tr>
              </thead>
              <tbody>
                {dummys.tokens?.map((asset, index) => {
                  const amount = faker.number.float(10);
                  const targetPrice = tokenPrices.find(
                    (price) => price.symbol == asset.symbol
                  );

                  return (
                    <tr key={`${asset.symbol}-${index}`}>
                      <th>
                        <Image
                          width={20}
                          height={20}
                          alt={asset.symbol}
                          src={asset.logo}
                        />
                      </th>
                      <td>{asset.symbol}</td>
                      <td>
                        {amount.toFixed(2)} ($
                        {(Number(targetPrice?.lastPrice ?? 0) * amount).toFixed(
                          2
                        )}
                        )
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <Image alt="bithumb assets" src={BithumbLogo} width={120} />
            <table className="table mb-5">
              {/* head */}
              <thead>
                <tr>
                  <th>토큰</th>
                  <th>티커</th>
                  <th>보유 수량</th>
                </tr>
              </thead>
              <tbody>
                {dummys.tokens?.map((asset, index) => {
                  const amount = faker.number.float(10);
                  const targetPrice = tokenPrices.find(
                    (price) => price.symbol == asset.symbol
                  );

                  return (
                    <tr key={`${asset.symbol}-${index}`}>
                      <th>
                        <Image
                          width={20}
                          height={20}
                          alt={asset.symbol}
                          src={asset.logo}
                        />
                      </th>
                      <td>{asset.symbol}</td>
                      <td>
                        {amount.toFixed(2)} ($
                        {(Number(targetPrice?.lastPrice ?? 0) * amount).toFixed(
                          2
                        )}
                        )
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioCustom;
