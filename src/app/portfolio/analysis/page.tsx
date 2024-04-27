"use client";

import { FaRobot } from "react-icons/fa";
import { KeyboardEventHandler, useState } from "react";

interface IMessage {
  sender: "user" | "AI";
  message: string;
}

const AI = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      message: "안녕하세요. 코인 봇 입니다.",
      sender: "AI",
    },
  ]);
  const [prompt, setPrompt] = useState("");

  const onKeyUp: KeyboardEventHandler = (keyEvent) => {
    if (keyEvent.code === "Enter") {
      onEnterPrompt();
    }
  };

  const onEnterPrompt = () => {
    setMessages(
      messages.concat({
        sender: "user",
        message: prompt,
      })
    );
    setPrompt("");
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="mb-4">
        <div className="flex gap-3 mb-4">
          <FaRobot size={30} />
          <h3 className="font-bold text-[24px]">코인머지 AI</h3>
        </div>
        <pre className="font-light text-gray-400">
          코인머지 AI는 당신의 자산추천을 위해 학습된 LLM (ChatGPT)에요.{"\n"}
          자산관련한 정보와 뉴스를 추천받으세요!
        </pre>
      </header>
      <section className="flex-1 flex flex-col p-4 rounded-box mb-4 bg-base-100 overflow-y-scroll">
        {messages.map((message, index) => {
          return (
            <div key={index} className={`chat ${message.sender === "AI" ? "chat-start" : "chat-end"}`}>
              <div className="chat-bubble">{message.message}</div>
            </div>
          );
        })}
      </section>
      <section className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={onKeyUp}
          placeholder="AI에게 코인 추천을 받아보세요!"
          className="input input-bordered input-primary w-full"
        />
        <button onClick={onEnterPrompt} className="btn btn-primary">
          Enter
        </button>
      </section>
    </div>
  );
};

export default AI;
