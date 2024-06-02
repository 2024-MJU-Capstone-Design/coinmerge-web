"use client";

import { FaChartPie } from "react-icons/fa";
import PortfolioPieGraph, { BITHUMB_DUMMY_DATA } from "./PortfolioPieGraph";

import BTCLogo from "../../../../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../../../../assets/images/logos/Ethereum (ETH).png";
import BinanceLogo from "../../../../assets/images/binance.png";
import BithumbLogo from "../../../../assets/images/bithumb.png";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import { useAppStore } from "@/stores/appStore";

const AssetSection = () => {
  const [assets] = useUserStore((state) => [state.assets]);
  const tokenPrices = useAppStore((state) => state.tokenPrices);

  const binanceAssets = assets?.assets.filter(
    (asset) => (asset.exchange.nameKor = "바이낸스")
  );

  return (
    <section className="p-4 rounded-box bg-base-100">
      <div className="flex items-center mb-5 gap-3">
        <FaChartPie size={30} />
        <h3 className="font-bold text-[24px]">자산 구성</h3>
      </div>
      <div className="w-full">
        <PortfolioPieGraph />
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
                <th>비중</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {binanceAssets?.map((asset) => {
                const targetPrice = tokenPrices.find(
                  (price) => price.symbol == asset.token.id
                );

                return (
                  <tr key={`${asset.exchange.nameEng}-${asset.token.id}`}>
                    <th>
                      <Image
                        width={20}
                        height={20}
                        alt={asset.token.id}
                        src={asset.token.logo}
                      />
                    </th>
                    <td>{asset.token.id}</td>
                    <td>
                      {asset.amount} ($
                      {(
                        Number(targetPrice?.lastPrice ?? 0) * asset.amount
                      ).toFixed(2)}
                      )
                    </td>
                    <td>{}</td>
                  </tr>
                );
              })}
              {/* row 2 */}
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
                <th>비중</th>
              </tr>
            </thead>
            <tbody>
              {BITHUMB_DUMMY_DATA?.map((asset) => {
                const targetPrice = tokenPrices.find(
                  (price) => price.symbol == asset.token.id
                );
                return (
                  <tr key={`${asset.exchange.nameEng}-${asset.token.id}`}>
                    <th>
                      <Image
                        width={20}
                        height={20}
                        alt={asset.token.id}
                        src={asset.token.logo}
                      />
                    </th>
                    <td>{asset.token.id}</td>
                    <td>
                      {asset.amount} ($
                      {(
                        Number(targetPrice?.lastPrice ?? 0) * asset.amount
                      ).toFixed(2)}
                      )
                    </td>
                    <td>{}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AssetSection;
