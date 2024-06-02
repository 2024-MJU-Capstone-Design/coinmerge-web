import { signIn, updateProfile } from "@/modules/apis";
import { imageUploadS3 } from "@/modules/aws";
import { IError } from "@/modules/globalErrorHandler";
import { isValidPassword } from "@/modules/helpers";
import { useUserStore } from "@/stores/userStore";
import { ProfileUpdateRequest, SignInRequest } from "@/types/api";
import { FormActionState } from "@/types/custom";

export const profileUpdateFormAction = async (
  prevState: FormActionState<ProfileUpdateRequest>,
  formData: FormData
): Promise<FormActionState<ProfileUpdateRequest>> => {
  const nickname = formData.get("nickname")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const passwordConfirm = formData.get("passwordConfirm")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const image = formData.get("profile-image") as File;
  let profileImageUri;

  if (!nickname) {
    return {
      success: false,
      message: "닉네임을 입력하세요.",
    };
  }

  if (password && passwordConfirm && !isValidPassword(password) || password !== passwordConfirm) {
    return {
      success: false,
      message: "비밀번호를 확인해주세요.",
    };
  }

  if (image.size != 0) {
    profileImageUri = await imageUploadS3(image);
  }

  try {
    const result = await updateProfile({
      nickname,
      password,
      description,
      profileImageUri: profileImageUri ?? "",
    });

    useUserStore.getState().setProfile(result);

    return {
      data: {
        nickname,
        password,
        description,
        profileImageUri: profileImageUri ?? "",
      },
      message: "프로필 업데이트에 성공했습니다.",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as IError).message ?? "프로필 업데이트에 실패했어요. 잠시 후 다시 시도해주세요.",
    };
  }
};
