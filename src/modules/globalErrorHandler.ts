import { useModalStore } from "@/stores/modalStore";
import { APP_BASE_URL } from "./constants";

export interface IError {
  statusCode: number;
  code: string;
  message: string;
}

export const globalErrorHandler = (error: IError) => {
  switch (error.statusCode) {
    case 401:
      // window.location.href = APP_BASE_URL+"/signin";
  }
};
