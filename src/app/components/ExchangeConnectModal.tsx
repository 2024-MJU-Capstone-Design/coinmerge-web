"use client";
import { connectExchange } from "@/modules/apis";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { Exchange } from "@/types/api";
import { ChangeEventHandler, useState } from "react";

interface Props {
  isOpen: boolean;
  close(): void;
}

const ExchangeConnectModal = ({ isOpen, close }: Props) => {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const exchanges = useAppStore((state) => state.exchanges);

  const setExchangeConnections = useUserStore(
    (state) => state.setExchangeConnections
  );
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );

  const btnDisabled = selectedExchange == null || !accessKey || !secretKey;

  const onChangeAccessKey: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAccessKey(e.target.value);
  };

  const onChangeSecretKey: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSecretKey(e.target.value);
  };

  const submitExchangeConnect = async () => {
    if (selectedExchange) {
      const result = await connectExchange({
        exchangeId: selectedExchange.id,
        accessKey,
        secretKey,
      });

      close();
      setExchangeConnections(result);
    }
  };

  return (
    <dialog
      id="exchange_connect_modal"
      className={`modal ${isOpen && "modal-open"}`}
    >
      <div className="modal-box">
        <button
          onClick={close}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">자산을 연동하세요!</h3>
        <div role="tablist" className="tabs tabs-boxed my-4">
          {exchanges.map((exchange, index) => {
            return (
              <button
                key={`${exchange.nameEng}-${index}`}
                role="tab"
                className={`tab ${
                  exchange.id === selectedExchange?.id && "tab-active"
                }`}
                onClick={() => setSelectedExchange(exchange)}
              >
                {exchange.nameKor}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="엑세스 키를 입력하세요"
            className="input input-bordered w-full"
            value={accessKey}
            onChange={onChangeAccessKey}
          />
          <input
            type="text"
            placeholder="시크릿 키를 입력하세요"
            className="input input-bordered w-full"
            value={secretKey}
            onChange={onChangeSecretKey}
          />
        </div>
        <button
          onClick={submitExchangeConnect}
          className={`btn w-full mt-4 btn-warning ${btnDisabled && "disabled btn-disabled"}`}
        >
          연동하기
        </button>
      </div>
    </dialog>
  );
};

export default ExchangeConnectModal;
