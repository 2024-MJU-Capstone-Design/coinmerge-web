"use client";

import ProfileUpdateForm from "./components/ProfileUpdateForm";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-[32px] mb-8">프로필 수정</h1>
      <ProfileUpdateForm />
    </div>
  );
};

export default SignUp;
