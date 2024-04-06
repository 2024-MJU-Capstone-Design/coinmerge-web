"use client";

import CountUp from "react-countup";
import { GoGraph } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import PortfolioPieGraph from "./PortfolioPieGraph";

import USDCLogo from "../../../../assets/images/logos/USD Coin (USDC).png";
import BTCLogo from "../../../../assets/images/logos/Bitcoin (BTC).png";
import ETHLogo from "../../../../assets/images/logos/Ethereum (ETH).png";
import USDTLogo from "../../../../assets/images/logos/Tether (USDT).png";
import BinanceLogo from "../../../../assets/images/binance.png";
import BithumbLogo from "../../../../assets/images/bithumb.png";
import Image from "next/image";

const AssetSection = () => {
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
              <tr>
                <th>
                  <Image width={20} alt="USDC" src={USDCLogo} />
                </th>
                <td>USDC</td>
                <td>98.23 ($100.24)</td>
                <td>7.16%</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>
                  <Image width={20} alt="USDT" src={USDTLogo} />
                </th>
                <td>USDT</td>
                <td>199.24 ($200.24)</td>
                <td>14.30%</td>
              </tr>
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
              {/* row 1 */}
              <tr>
                <th>
                  <Image width={20} alt="BTC" src={BTCLogo} />
                </th>
                <td>BTC</td>
                <td>0.013 ($900.24)</td>
                <td>64.27</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>
                  <Image width={20} alt="ETH" src={ETHLogo} />
                </th>
                <td>ETH</td>
                <td>0.060 ($200.24)</td>
                <td>14.30%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AssetSection;
