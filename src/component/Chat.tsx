// components/Chat.tsx
import { useEffect, useState } from 'react';

interface Message {
  message: string;
}

interface ChatProps {
  conversationID: string;
}

const Chat: React.FC<ChatProps> = ({ conversationID }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Conectar al servidor WebSocket
    const socket = new WebSocket(`ws://localhost:4000/ws/${conversationID}`);

    socket.onopen = () => {
      console.log('Conectado al servidor WebSocket');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
      setIsConnected(false);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [conversationID]);

  const sendMessage = () => {
    if (ws && isConnected && input) {
      ws.send(JSON.stringify({ message: input }));
      setInput('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        title="Input field"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;