interface Props {
  isVisible: boolean;
}

const LoadingModal = ({isVisible}: Props) => {
  return (
    <dialog className={`modal ${isVisible && "modal-open"}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">자산 동기화 중</h3>
        <p className="py-4">코인머지에서 자산을 동기화 중입니다. 잠시만 기다려주세요!</p>
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    </dialog>
  );
};

export default LoadingModal;