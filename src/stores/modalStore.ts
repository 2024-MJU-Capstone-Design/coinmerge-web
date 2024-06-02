import { create } from "zustand";

interface ModalState {
  visible: boolean;
  success: boolean;
  message: string;
  callback: () => void;
}

interface ModalAction {
  showModal(success: boolean, message: string, callback?: () => void): void;
  hideModal(): void;
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  visible: false,
  success: false,
  message: "",
  callback: () => {},
  showModal: (success: boolean, message: string, callback?: () => void) => {
    set({
      visible: true,
      success,
      message,
      callback,
    });
  },
  hideModal: () => {
    set({
      callback: () => {},
      visible: false,
    });
  },
}));
