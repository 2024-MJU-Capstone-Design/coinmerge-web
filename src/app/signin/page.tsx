"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signInFormAction } from "./actions";
import { useEffect } from "react";
import { useModalStore } from "@/stores/modalStore";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [signInState, action, loading] = useFormState(signInFormAction, {
    success: null,
    message: "",
  });
  const showModal = useModalStore((state) => state.showModal);
  const router = useRouter();

  useEffect(() => {
    if (signInState.success != null) {
      if (signInState.success) {
        showModal(signInState.success, signInState.message, () => router.push("/portfolio"));
      } else {
        showModal(signInState.success, signInState.message.replaceAll("[", "").replaceAll("]", ""));
      }
    }
  }, [signInState, showModal]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-[32px] mb-8">로그인</h1>
      <form action={action} className="flex flex-col gap-6 w-1/3">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="이메일을 입력하세요"
            name="email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            placeholder="비밀번호를 입력하세요."
            type="password"
            className="grow"
            name="password"
          />
        </label>
        <button className="btn btn-warning">로그인 하기</button>
        <Link href="signup" className="btn btn-outline btn-warning">
          회원가입 하기
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
