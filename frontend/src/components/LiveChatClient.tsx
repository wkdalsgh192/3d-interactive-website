import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: number;
}

const socket: Socket = io('http://localhost:8080/chat', {
  transports: ["websocket"],
  withCredentials: true
});

const randomGuestName = () => {
  const adjectives = ["Cool", "Swift", "Mighty", "Lucky", "Sneaky", "Brave", "Chill", "Rapid"];
  const animals = ["Dolphin", "Panda", "Eagle", "Otter", "Tiger", "Fox", "Shark", "Falcon"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj}${animal}${num}`;
};

const username = randomGuestName();

function LiveChatClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

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
    <div className="flex flex-col h-screen justify-end p-4 bg-black/50 text-white font-mono">
      <div className="overflow-y-auto mb-2 space-y-1">
        {messages.map((m, i) => (
          <div key={i} className="animate-fadeInUp">
            <span className="text-blue-400">{m.user}</span>: {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-800 focus:outline-none"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-3 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default LiveChatClient;
