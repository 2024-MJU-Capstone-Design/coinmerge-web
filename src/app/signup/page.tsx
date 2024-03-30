"use client";

import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-[32px] mb-8">회원가입</h1>
      <form className="flex flex-col items-center w-1/3 gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">이메일</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">닉네임</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">비밀번호</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">비밀번호 확인</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <button className="btn btn-warning w-full mt-8">회원가입 완료하기</button>
      </form>
    </div>
  );
};

export default SignUp;
