"use client";
import { FaRobot, FaChartPie } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";
import dayjs from "dayjs";

import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import { useAppStore } from "@/stores/appStore";
import ExchangeConnectModal from "../components/ExchangeConnectModal";
import ExchangeDisconnectModal from "../components/ExchangeDisconnectModal";
import { DEFAULT_USER_PROFILE_URI } from "@/modules/constants";
import { updateAssets } from "@/modules/apis";
import LoadingModal from "../components/LoadingModal";
import { useParams, useSearchParams } from "next/navigation";

const LayoutFallback = () => {
  return <></>;
};

const Layout = ({ children }: PropsWithChildren) => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  const [
    profile,
    exchangeConnections,
    exchangeConnectionsLoading,
    loadExchangeConnections,
    loadAssets,
  ] = useUserStore((state) => [
    state.profile,
    state.exchangeConnections,
    state.exchangeConnectionsLoading,
    state.loadExchangeConnections,
    state.loadAssets,
    state.setAssets,
  ]);
  const [loadAppState, loadingAppState] = useAppStore((state) => [
    state.loadAppState,
    state.loadingAppState,
  ]);
  const [exchangeConnectModalVisible, setExchangeConnectModalVisible] =
    useState<boolean>(false);
  const [exchangeDisconnectModalVisible, setExchangeDisonnectModalVisible] =
    useState<boolean>(false);
  const [updateAssetLoading, setUpdateAssetLoading] = useState<boolean>(false);

  const onClickAssetUpdate = async () => {
    setUpdateAssetLoading(true);
    try {
      await updateAssets();
      await loadAssets();
    } finally {
      setUpdateAssetLoading(false);
    }
    setProfileUri(searchParams.get("profile"));
    setNickname(searchParams.get("nickname"));
  };

  useEffect(() => {
    loadExchangeConnections();
    loadAssets();
    loadAppState();
  }, []);

  return (
    <Suspense fallback={<LayoutFallback />}>
      <div className="flex p-4 gap-4 items-start">
        <div className="flex flex-col gap-4">
          {!id && (
            <ul className="menu w-56 bg-base-200 rounded-box">
              <li className="focus">
                <Link href="/portfolio">
                  <FaChartPie />홈
                </Link>
              </li>
              <li>
                <Link href="/portfolio/analysis">
                  <FaRobot />
                  코인머지 AI
                  <span className="badge badge-sm badge-warning">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio/transaction">
                  <GrTransaction />
                  거래 내역
                </Link>
              </li>
            </ul>
          )}
          <section className="flex flex-col w-56 items-center bg-base-200 rounded-box p-4 gap-2">
            <Image
              className="rounded-full"
              width={60}
              height={60}
              src={
                profileUri
                  ? profileUri
                  : profile?.profileImage ?? DEFAULT_USER_PROFILE_URI
              }
              alt="user profile"
            />
            <p className="font-bold text-[24px]">
              {nickname ? nickname : profile?.nickname ?? ""}
            </p>
            <button className="btn btn-xs btn-outline">
              <IoCopyOutline />
              Copy Portfolio Link
            </button>
            <pre className="font-light text-[12px] whitespace-pre-line text-gray">
              {profileUri ? "" : profile?.description}
            </pre>
          </section>
          <section className="flex flex-col w-56 bg-base-200 rounded-box p-4 gap-2">
            <div>
              <p className="font-light text-gray-300 text-[12px]">조회 수</p>
              <p className="font-light text-[12px]">10 회</p>
            </div>
            <div>
              <p className="font-light text-gray-300 text-[12px]">가입 일</p>
              <p className="font-light text-[12px]">
                {dayjs().format("YYYY.MM.DD")}
              </p>
            </div>
          </section>
        </div>
        <div className="bg-base-200 w-full rounded-box p-4  h-[calc(100vh-120px)] flex flex-col overflow-y-scroll">
          {exchangeConnectionsLoading || exchangeConnections?.length == 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <button
                className="btn btn-active btn-primary"
                onClick={() => setExchangeConnectModalVisible(true)}
              >
                자산을 연동하고 서비스를 이용하세요!
              </button>
            </div>
          ) : (
            <>
              {!id && (
                <div className="flex gap-4 bg-red justify-end mb-3">
                  <h3>거래소 연동</h3>
                  <button
                    className="btn btn-xs btn-accent"
                    onClick={onClickAssetUpdate}
                  >
                    자산 업데이트
                  </button>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => setExchangeConnectModalVisible(true)}
                  >
                    연동
                  </button>
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => setExchangeDisonnectModalVisible(true)}
                  >
                    해제
                  </button>
                </div>
              )}
              {children}
            </>
          )}
        </div>
        <ExchangeConnectModal
          isOpen={exchangeConnectModalVisible}
          close={() => setExchangeConnectModalVisible(false)}
        />
        <ExchangeDisconnectModal
          isOpen={exchangeDisconnectModalVisible}
          close={() => setExchangeDisonnectModalVisible(false)}
        />
        <LoadingModal isVisible={updateAssetLoading} />
      </div>
    </Suspense>
  );
};

export default Layout;
