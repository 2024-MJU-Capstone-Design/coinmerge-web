"use client";

import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-[32px] mb-8">회원가입</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
