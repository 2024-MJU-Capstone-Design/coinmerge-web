"use client";

import { TOKENS } from "@/modules/constants";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { useRouter } from "next/navigation";

const dummyTokens = [
  [TOKENS.BTC, TOKENS.USDC],
  [TOKENS.BTC],
  [TOKENS.ETH],
  [TOKENS.USDT, TOKENS.USDC],
  [TOKENS.BTC, TOKENS.ETH, TOKENS.USDC, TOKENS.USDT],
];

const dummys = Array.from({ length: 100 }, (v, i) => {
  return {
    nickname: faker.person.firstName(),
    profit: faker.number.float({
      min: -1000,
      max: 1000,
      fractionDigits: 2,
    }),
    profile: faker.image.avatarGitHub(),
    tokens: dummyTokens[faker.number.int(4)],
  };
}).sort((a, b) => b.profit - a.profit);

const Leaderboard = () => {
  const router = useRouter();
  const onClickItem = () => {
    router.push("/portfolio");
  };

  return (
    <div className="m-4 p-4 rounded-box bg-base-200">
      <header className="flex flex-col gap-4 mb-4">
        <h1 className="font-bold text-[24px]">리더보드</h1>
        <p className="font-light text-[16px]">
          리더보드를 통해서 유저들의 수익률을 파악하고, 어떠한 포트폴리오로
          투자하는지 확인하세요!
        </p>
      </header>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Profit</th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            {dummys.map((item, index) => {
              return (
                <tr
                  className="hover:bg-base-100 cursor-pointer"
                  onClick={onClickItem}
                  key={`${item.nickname}-${index}`}
                >
                  <th>{index + 1}</th>
                  <td>
                    <Image width={30} height={30} className="rounded-box" src={item.profile} alt="user profile" />
                  </td>
                  <td>{item.nickname}</td>
                  <td
                    className={
                      item.profit > 0 ? "text-deposit" : "text-withdraw"
                    }
                  >
                    {item.profit} %
                  </td>
                  <td>
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                      {item.tokens.map((item) => {
                        return (
                          <div className="avatar" key={item.symbol}>
                            <div className="w-[30px]">
                              <Image src={item.logo} alt="token logos" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
