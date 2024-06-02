"use client";

import { FaRobot } from "react-icons/fa";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { promptAI } from "@/modules/apis";

interface Message {
  timestamp: number;
  message: string;
  sender: "user" | "ai";
}

const GUIDE_QUESTION = [
  "내일 비트코인 가격을 알려줘",
  "내일 이더리움 가격은 어떻게 변할까?",
  "내 코인과 관련된 정보를 알려줘!",
  "리플과 관련된 정보를 알려줘!",
  "솔라나와 관련된 정보를 알려줘!"
];

const AI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      timestamp: new Date().getTime(),
      message: "안녕하세요. 코인 봇 입니다.",
      sender: "ai",
    },
  ]);
  const mergedMessage = [...messages, ...aiMessages].sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const [prompt, setPrompt] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onKeyUp: KeyboardEventHandler = (keyEvent) => {
    if (keyEvent.code === "Enter") {
      onEnterPrompt();
    }
  };

  const onEnterPrompt = async () => {
    if (!prompt) return;
    scrollToBottom();
    sendPrompt(prompt);
    setPrompt("");
  };

  const sendPrompt = async (prompt: string) => {
    setMessages(
      messages.concat({
        timestamp: new Date().getTime(),
        message: prompt,
        sender: "user",
      })
    );
    loadPrompt(prompt);
  }

  const loadPrompt = async (message: string) => {
    setPromptLoading(true);
    const result = await promptAI(message);

    setAiMessages(
      aiMessages.concat({
        timestamp: new Date().getTime(),
        message: result.generation,
        sender: "ai",
      })
    );
    setPromptLoading(false);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(()=> {
    scrollToBottom();
  },[aiMessages, messages])

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="mb-4">
        <div className="flex gap-3 mb-4">
          <FaRobot size={30} />
          <h3 className="font-bold text-[24px]">코인머지 AI</h3>
        </div>
        <pre className="font-light text-gray-400">
          코인머지 AI는 당신의 자산추천을 위해 파인튜닝 된 LLM (ChatGPT)에요.
          {"\n"}
          자산관련한 정보와 뉴스를 추천받으세요!
        </pre>
      </header>
      <section
        ref={scrollRef}
        className="flex-1 flex flex-col p-4 rounded-box mb-4 bg-base-100 overflow-y-scroll"
      >
        {mergedMessage.map((message, index) => {
          return (
            <div
              key={index}
              className={`chat ${
                message.sender === "ai" ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-bubble">{message.message}</div>
            </div>
          );
        })}
      </section>
      <section className="flex gap-4 mb-4">
        {GUIDE_QUESTION.map((question) => (
          <button key={question} className={`btn btn-xs btn-outline btn-success ${promptLoading && "btn-disabled"}`} onClick={() => sendPrompt(question)}>
            {question}
          </button>
        ))}
      </section>
      <section className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={onKeyUp}
          placeholder="AI에게 코인 추천을 받아보세요!"
          className={`input input-bordered input-primary w-full ${
            promptLoading && "input-disabled"
          }`}
        />
        <button
          onClick={onEnterPrompt}
          className={`btn btn-primary ${promptLoading && "btn-disabled"}`}
        >
          Enter
        </button>
      </section>
    </div>
  );
};

export default AI;
