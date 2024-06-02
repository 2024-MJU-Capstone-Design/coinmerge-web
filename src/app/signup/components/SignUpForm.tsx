"use client";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

import { useModalStore } from "@/stores/modalStore";
import { signUpFormAction } from "../actions";
import { DEFAULT_USER_PROFILE_URI } from "@/modules/constants";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [image, setImage] = useState(DEFAULT_USER_PROFILE_URI);
  const [signUpState, action, loading] = useFormState(signUpFormAction, {
    message: "",
    success: null,
  });
  const router = useRouter();
  const showModal = useModalStore((state) => state.showModal);

  const imagePickerRef = useRef<HTMLInputElement>(null);

  const onClickImagePicker = () => {
    if (imagePickerRef.current) {
      imagePickerRef.current.click();
    }
  };

  const onChangeImagePicker: ChangeEventHandler<HTMLInputElement> = (event) => {
    const imageFile = event?.target?.files?.[0] ?? null;

    if (imageFile) {
      setImage(URL.createObjectURL(imageFile));
    }
  };

  useEffect(() => {
    if (signUpState.success != null) {
      if (signUpState.success) {
        showModal(signUpState.success, signUpState.message, () => {
          router.push("signin");
        });
      } else {
        showModal(signUpState.success, signUpState.message);
      }
    }
  }, [signUpState]);

  return (
    <form action={action} className="flex flex-col items-center w-1/3 gap-4">
      <label className="form-control w-full flex">
        <div className="label">
          <span className="label-text">프로필 사진</span>
        </div>
        <div
          className="avatar cursor-pointer self-center"
          onClick={onClickImagePicker}
        >
          <div className="w-24 rounded">
            <Image width={96} height={96} alt="profile image" src={image} />
          </div>
        </div>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">이메일</span>
        </div>
        <input
          type="text"
          maxLength={30}
          name="email"
          placeholder="이메일을 입력하세요"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">닉네임</span>
        </div>
        <input
          maxLength={16}
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">비밀번호</span>
        </div>
        <input
          type="password"
          name="password"
          maxLength={16}
          placeholder="비밀번호를 입력하세요."
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">비밀번호 확인</span>
        </div>
        <input
          type="password"
          name="passwordConfirm"
          maxLength={16}
          placeholder="비밀번호를 다시한번 입력해 주세요."
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">설명</span>
        </div>
        <textarea
          name="description"
          className="textarea"
          maxLength={300}
          placeholder="자신을 소개해주세요."
        />
      </label>
      <input type="submit" className="btn btn-warning w-full mt-8" />
      <input
        className="invisible"
        type="file"
        name="profile-image"
        onChange={onChangeImagePicker}
        ref={imagePickerRef}
        accept="image/*" // 이미지 파일만 선택 가능하도록 제한
      />
    </form>
  );
};

export default SignUpForm;
