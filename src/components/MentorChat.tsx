import React, { useState, useEffect } from 'react';
import { ProjectBlueprint } from '@/types/project';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MentorChatProps {
  blueprint?: ProjectBlueprint;
}

export const MentorChat: React.FC<MentorChatProps> = ({ blueprint }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const storageKey = 'mentor_chat_history';

  // Load persisted chat history
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatMessage[];
        setChatHistory(parsed);
      } catch (_) {}
    }
  }, []);

  // Persist chat history
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    try {
      const res = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userMsg, blueprint }),
      });
      const data = await res.json();
      if (data.success && data.response) {
        setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not generate a response.' }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: 'Error contacting mentor service.' }]);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-800"
        onClick={() => setChatOpen(true)}
        aria-label="Open Project Mentor Chat"
      >
        ⚡
      </button>

      {/* Slide‑over panel */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-zinc-900 text-zinc-100 border-l border-zinc-800 transform transition-transform ${chatOpen ? 'translate-x-0' : 'translate-x-full'} duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h4 className="text-lg font-medium">Project Mentor</h4>
          <button
            className="text-zinc-400 hover:text-white"
            onClick={() => setChatOpen(false)}
            aria-label="Close Mentor Chat"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <div
                className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-zinc-700' : 'bg-zinc-800'}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-zinc-800 flex">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded px-2 py-1 focus:outline-none"
            placeholder="Ask the mentor..."
          />
          <button
            type="submit"
            className="ml-2 bg-black text-white px-3 py-1 rounded hover:bg-zinc-800"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};
