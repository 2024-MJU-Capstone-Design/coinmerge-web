"use client";

import { useModalStore } from "@/stores/modalStore";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const GlobalModal = () => {
  const { visible, success, message, hideModal, callback } = useModalStore(
    (state) => state
  );

  return (
    <dialog id="global_modal" className={`modal ${visible && "modal-open"}`}>
      <div className="modal-box">
        <div className="flex gap-3 justify-center items-center">
          {success ? (
            <FaCheckCircle color="green" />
          ) : (
            <FaCircleXmark color="red" />
          )}
          <h3 className="font-bold text-lg">{success ? "성공" : "실패"}</h3>
        </div>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn"
              onClick={() => {
                callback?.();
                hideModal();
              }}
            >
              확인
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default GlobalModal;
