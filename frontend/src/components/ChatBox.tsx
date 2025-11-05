import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";


interface ChatMessage {
    user: string;
    text: string;
    color?: string;
    timestamp: number;
}


const socket: Socket = io("http://localhost:8080/chat", {
    transports: ["websocket"],
  });

// Generate random guest name and color
const generateGuestName = () => {
    const adjectives = ["Sneaky", "Brave", "Chill", "Rapid", "Lucky", "Swift"];
    const animals = ["Dolphin", "Panda", "Eagle", "Otter", "Tiger", "Fox"];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const num = Math.floor(Math.random() * 900 + 100);
    return `${adj}${animal}${num}`;
  };
const getOrCreateGuest = () => {
    const saved = localStorage.getItem("guestName");
    if (saved) return saved;
    const newName = generateGuestName();
    localStorage.setItem("guestName", newName);
    return newName;
};

export default function ChatBox() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const username = getOrCreateGuest();
    const [color] = useState(["#60a5fa", "#f472b6", "#34d399", "#facc15", "#f87171"][
        Math.floor(Math.random() * 5)
      ]
    );

    useEffect(() => {
        socket.on('chat-message', (msg: ChatMessage) => {
          setMessages(prev => [...prev.slice(-20), msg]);
        });
        return () => {socket.off('chat-message') };
      }, []);


    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const msg: ChatMessage = {
            user: username,
            text: input,
            timestamp: Date.now(),
        };
        socket.emit('chat-message', msg);
        setInput('');
    };

    return (
        <div 
          className="fixed bottom-6 right-6 w-[360px] h-[420px] bg-black/60 backdrop-blur-md border border-gray-700 rounded-xl p-4 text-white font-sans shadow-lg relative"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '360px',
            height: '420px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgb(55, 65, 81)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Messages */}
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingRight: '4px',
              paddingBottom: '64px',
              minHeight: 0
            }}
          >
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={m.timestamp + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: '14px', marginBottom: '4px' }}
                >
                  <span style={{ color: m.color || "#60a5fa" }}>{m.user}</span>
                  {": "}
                  <span>{m.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
    
          {/* Input Row - Absolutely positioned at bottom */}
          <form 
            onSubmit={sendMessage}
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                backgroundColor: 'rgba(17, 24, 39, 0.7)',
                border: '1px solid rgb(75, 85, 99)',
                color: 'white',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '14px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgb(14, 165, 233)'}
              onBlur={(e) => e.target.style.borderColor = 'rgb(75, 85, 99)'}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'rgb(2, 132, 199)',
                padding: '6px 12px',
                fontSize: '14px',
                borderRadius: '6px',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(3, 105, 161)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(2, 132, 199)'}
            >
              Send
            </button>
          </form>
        </div>
      );
}

