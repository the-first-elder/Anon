import React, { useEffect, useState } from "react";

const ForumChat = () => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("forumMessages");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("forumMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[70vh] p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">🗨️ Forum Thread</h2>

      <div className="flex-1 h-[70vh] overflow-y-scroll rounded-lg bg-white p-4 space-y-3 lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-200 p-3 rounded-md shadow-sm flex flex-col">
              <p className="text-gray-800">{msg.text}</p>
              <span className="text-xs text-gray-500 ml-auto">{msg.timestamp}</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-dark text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ForumChat;
