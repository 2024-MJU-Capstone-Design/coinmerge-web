import { getProfile, signIn } from "@/modules/apis";
import { IError } from "@/modules/globalErrorHandler";
import { useUserStore } from "@/stores/userStore";
import { SignInRequest } from "@/types/api";
import { FormActionState } from "@/types/custom";
import { setCookie } from "cookies-next";

export const signInFormAction = async (
  prevState: FormActionState<SignInRequest>,
  formData: FormData
): Promise<FormActionState<SignInRequest>> => {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  try {
    const result = await signIn({
      email,
      password,
    });

    setCookie("SESSION_ID", result.id);

    const profile = await getProfile();

    useUserStore.getState().setProfile(profile);

    return {
      data: {
        email,
        password,
      },
      message: "로그인에 성공했습니다.",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as IError).message ?? "로그인에 실패했어요. 인증 정보를 다시 확인하세요.",
    };
  }
};
