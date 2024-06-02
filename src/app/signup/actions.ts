import { SignUpRequest } from "@/types/api";
import { isValidEmail, isValidPassword } from "@/modules/helpers";
import { FormActionState } from "@/types/custom";
import { signUp } from "@/modules/apis";
import { imageUploadS3 } from "@/modules/aws";
import { IError } from "@/modules/globalErrorHandler";

export const signUpFormAction = async (
  prevState: FormActionState<SignUpRequest>,
  formData: FormData
): Promise<FormActionState<SignUpRequest>> => {
  const email = formData.get("email")?.toString() ?? "";
  const nickname = formData.get("nickname")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const passwordConfirm = formData.get("passwordConfirm")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const image = formData.get("profile-image") as File;
  let profileImageUri;

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "이메일을 확인해주세요.",
    };
  }

  if (!nickname) {
    return {
      success: false,
      message: "닉네임을 입력하세요.",
    };
  }

  if (!isValidPassword(password) || password !== passwordConfirm) {
    return {
      success: false,
      message: "비밀번호를 확인해주세요.",
    };
  }

  if (image.size != 0) {
    profileImageUri = await imageUploadS3(image);
  }

  try{
    const result = await signUp({
      email,
      password,
      nickname,
      description,
      profileImageUri: profileImageUri ?? "",
    });
  
    return {
      data: {
        email: email,
        nickname: nickname,
        password: password,
        description: description,
        profileImageUri: profileImageUri ?? "",
      },
      message: "회원가입이 완료되었습니다!",
      success: true,
    };
  }catch(error) {
    console.log(error);
    return {
      success: false,
      message: (error as IError)?.message ?? "회원가입에 실패하였습니다.",
    };
  }
};
