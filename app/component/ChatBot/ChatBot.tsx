'use client';

import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

const ChatBot = () => {
  const [chat, setChat] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setChat((prev) => [...prev, `You: ${input}`]);
    const userInput = input;
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const text = await res.text();
      if (!text) {
        setChat((prev) => [...prev, `Bot: No response from server.`]);
        return;
      }

      const data = JSON.parse(text);
      setChat((prev) => [...prev, `Bot: ${data.reply}`]);
    } catch (err) {
      console.error('Chat error:', err);
      setChat((prev) => [...prev, `Bot: Sorry, there was an error.`]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#055FA8] text-white p-3 rounded-full shadow-lg hover:bg-[#044a7c] transition"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[350px] md:w-[400px] max-h-[500px] bg-black text-white rounded-xl shadow-xl flex flex-col border-2 border-[#CF2121]">
          {/* Header */}
          <div className="bg-[#055FA8] text-white p-4 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold text-lg">AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-[16px]" style={{ maxHeight: '350px' }}>
            {chat.map((line, i) => (
              <div
                key={i}
                className={`p-2 rounded max-w-[80%] ${
                  line.startsWith('You:')
                    ? 'bg-[#CF2121] ml-auto'
                    : 'bg-[#055FA8] mr-auto'
                }`}
              >
                {line}
              </div>
            ))}
            <div ref={chatEndRef} /> {/* Auto-scroll anchor */}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-gray-700 p-3 bg-black rounded-b-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 rounded bg-gray-900 text-white outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-[#CF2121] hover:bg-[#a41a1a] transition px-4 py-2 rounded text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
