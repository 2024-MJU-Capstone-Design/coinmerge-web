"use client";
import { disconnectExchange } from "@/modules/apis";
import { useUserStore } from "@/stores/userStore";
import { ExchangeConnection } from "@/types/api";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  close(): void;
}

const ExchangeDisconnectModal = ({ isOpen, close }: Props) => {
  const [exchangeConnections, setExchangeConnections] = useUserStore(
    (state) => [state.exchangeConnections, state.setExchangeConnections]
  );

  const submitExchangeDisconnect = async (
    exchangeConnection: ExchangeConnection
  ) => {
    const result = await disconnectExchange({
      exchangeConnectionId: exchangeConnection.id,
    });

    setExchangeConnections(result);
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
        <h3 className="font-bold text-lg">자산연동 해제</h3>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>거래소</th>
              <th>공개키</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {exchangeConnections.map((exchangeConnection, index) => {
              return (
                <tr key={exchangeConnection.id}>
                  <td>
                    <div className="flex gap-3">
                      <Image
                        width={80}
                        height={20}
                        src={exchangeConnection.exchange.logo}
                        alt={exchangeConnection.exchange.nameEng}
                      />
                      <div className="font-bold">
                        {exchangeConnection.exchange.nameKor}
                      </div>
                    </div>
                  </td>
                  <td>
                    {exchangeConnection.accessKey.slice(0, 8) + "*".repeat(8)}
                  </td>
                  <th>
                    <button
                      className="btn btn-xs btn-active btn-secondary"
                      onClick={() =>
                        submitExchangeDisconnect(exchangeConnection)
                      }
                    >
                      해제
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
      </div>
    </dialog>
  );
};

export default ExchangeDisconnectModal;
