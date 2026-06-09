'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE = `Hi! I'm Victoria's AI — like Victoria, but in chatbot form. I can tell you about her work, skills, and availability.\n\nFeel free to ask anything. Si preferís charlar en español, escribí tu primer mensaje en español y seguimos por ahí. 🔮`;

const QUICK_OPTIONS = [
  { id: 'tech', label: 'What technologies do you work with?' },
  { id: 'available', label: 'Are you available for new projects?' },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [visitorName, setVisitorName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && nameSubmitted && messages.length === 0) {
      setMessages([{ role: 'assistant', content: WELCOME_MESSAGE }]);
    }
  }, [open, nameSubmitted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleNameSubmit() {
    const name = nameInput.trim();
    if (!name) return;
    setVisitorName(name);
    setNameSubmitted(true);
  }

  function handleNameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameSubmit();
    }
  }

  async function sendMessage(content: string) {
    if (!content.trim()) return;
    setChipsVisible(false);
    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, visitorName }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      <button
        className="chatbot-trigger"
        onClick={() => setOpen(prev => !prev)}
        aria-label="Open chat"
      >
        {/* Orbe */}
        <span className="chatbot-orb">
          <span className="chatbot-orb-mist" />
          <span className="chatbot-orb-shine" />
          <span className="chatbot-orb-shine2" />
          <span className="chatbot-orb-hi">Hi!</span>
        </span>

        {/* Base gótica — garra con luna */}
        <svg
          className="chatbot-base"
          viewBox="0 0 80 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="40" cy="22" rx="26" ry="3" fill="rgba(0,0,0,0.35)" />
          <path
            d="M14 2 C16 10, 28 16, 40 17 C52 16, 64 10, 66 2 Z"
            fill="#120508"
            stroke="#3a1520"
            strokeWidth="0.7"
          />
          <path
            d="M14 2 C28 6, 52 6, 66 2"
            fill="none"
            stroke="#8b1a2e"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <path
            d="M20 3 C17 7, 13 9, 12 14 C14 13, 16 11, 18 13 C17 10, 19 7, 22 5 Z"
            fill="#1a0a0e"
            stroke="#3a1520"
            strokeWidth="0.6"
          />
          <path
            d="M60 3 C63 7, 67 9, 68 14 C66 13, 64 11, 62 13 C63 10, 61 7, 58 5 Z"
            fill="#1a0a0e"
            stroke="#3a1520"
            strokeWidth="0.6"
          />
          <rect x="36" y="16" width="12" height="4" rx="1" fill="#0e0407" stroke="#2a1018" strokeWidth="0.5" />
          <path
            d="M28 20 Q40 22 52 20 L50 23 Q40 24 30 23 Z"
            fill="#0a0205"
            stroke="#2a1018"
            strokeWidth="0.5"
          />
          <path
            d="M36 10 C34 8, 34 13, 37 13 C35 13, 34 10, 36 10 Z"
            fill="#8b1a2e"
            opacity="0.4"
          />
        </svg>
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="chatbot-header-title">Victoria AI</span>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          {!nameSubmitted ? (
            <div className="chatbot-name-screen">
              <p className="chatbot-name-prompt">Before we begin... what's your name? 🔮</p>
              <div className="chatbot-input-row">
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Your name..."
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  autoFocus
                />
                <button
                  className="chatbot-send"
                  onClick={handleNameSubmit}
                  disabled={!nameInput.trim()}
                  aria-label="Continue"
                >
                  →
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="chatbot-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`chatbot-message ${msg.role}`}>
                    <p>{msg.content}</p>
                  </div>
                ))}

                {chipsVisible && messages.length > 0 && (
                  <div className="chatbot-chips">
                    {QUICK_OPTIONS.map(opt => (
                      <button key={opt.id} className="chatbot-chip" onClick={() => sendMessage(opt.label)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="chatbot-message assistant">
                    <p className="chatbot-typing">✦ ✦ ✦</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="chatbot-input-row">
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <button
                  className="chatbot-send"
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
