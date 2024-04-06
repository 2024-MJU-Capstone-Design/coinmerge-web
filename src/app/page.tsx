"use client";
import Lottie from "lottie-react";
import {Fade} from "react-awesome-reveal";
import coinAnimation from "../assets/lotties/coins.json";

const Home = () => {
  return (
    <div className="h-[calc(100vh-69px)] flex flex-col justify-between py-24">
      <section className="flex items-end justify-between overflow-visible">
        <pre className="font-bold text-[32px] whitespace-pre">
          코인 머지와 함께,{"\n"}
          당신의 암호화폐 자산을{"\n"}
          <Fade cascade>
            <p className="text-yellow-100">한 눈에 파악하고,</p>
            <p className="text-yellow-300">한 번에 관리하세요.</p>
          </Fade>
        </pre>
        <Lottie
          className="h-[500px]"
          animationData={coinAnimation}
        />
      </section>
      <div className="stats shadow w-full mt-5 overflow-visible">
        <div className="stat">
          <div className="stat-title">지원 거래소</div>
          <Fade delay={1000}>
            <div className="stat-value text-primary">국내/외 8 곳</div>
          </Fade>
          <div className="stat-desc">계속해서 추가하고 있습니다.</div>
        </div>

        <div className="stat">
          <div className="stat-title">현재 트래킹 자산</div>
          <Fade delay={1500}>
            <div className="stat-value text-warning">4500$, 8개의 토큰</div>
          </Fade>
          <div className="stat-desc">
            다양한 유저들이, 다양한 자산을 관리하고 있어요
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">유저들을 위한 AI</div>
          <Fade delay={2000}>
            <div className="stat-value text-emerald-300">총 2개의 AI 모델</div>
          </Fade>
          <div className="stat-desc">
            수익을 예측하고, 정보를 제공하려 AI가 학습중이에요.
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online"></div>
          </div>
          <div className="stat-title">사용자 만족도</div>
          <Fade delay={2500}>
            <div className="stat-value text-green-400">86%</div>
          </Fade>
          <div className="stat-desc">
            의 유저들이 서비스에 만족하고 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
