"use client";
import React, { useState } from "react";
import axios from "axios";

type Message = {
  role: "user" | "assistant";
  content: string,
  ui?:string,
};

function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! 👋 I'm here to help plan your trip. Where will you start your journey?",
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const onSend = async () => {
    if (!userInput.trim()) return;

    const newMsg: Message = { role: "user", content: userInput };

    setMessages((prev) => [...prev, newMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("/api/aimodel", {
        messages: [...messages, newMsg],
      });

      const aiReply: Message = {
        role: "assistant",
        content: res.data.message,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Something went wrong. Try again!",
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div className="w-full h-screen grid grid-cols-2 overflow-hidden">
      {/* LEFT – CHATBOX */}
      <div className="bg-gray-50 p-4 flex flex-col border-r">
        <h2 className="text-xl font-semibold text-center mb-4">Chatbox</h2>

        <section className="flex flex-col gap-4 overflow-y-auto flex-1 px-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow-md ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              AI is typing...
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
        </section>

        {/* INPUT */}
        <div className="mt-4 flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow border">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            className="flex-1 outline-none text-sm"
          />
          <button
            onClick={onSend}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* RIGHT – MAP */}
      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-center mb-4">Your Map</h2>
        <div className="w-full flex-1 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-600 text-xl">
          Map will display here
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
