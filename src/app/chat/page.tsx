'use client';

import { useEffect, useState, FormEvent, useCallback } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

interface Message {
  sender_id: string;
  content: string;
  timestamp: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [idUser, setIdUser] = useState('');
  const [idParticipants, setIdParticipants] = useState('');
  const [conversationId, setConversationId] = useState('66a679f140d5cbc6140fac4f');
  const [senderId, setSenderId] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [ws, setWs] = useState<ReconnectingWebSocket | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: Message = JSON.parse(event.data);
      console.log('Mensaje recibido:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
    }
  }, []);

  useEffect(() => {
    if (!conversationId) {
      console.error('El ID de la conversación no está definido.');
      return;
    }

    const socket = new ReconnectingWebSocket(`ws://127.0.0.1:4000/ws/${conversationId}`);
    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    socket.onmessage = handleMessage;

    socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setWs(socket);

    return () => {
      socket.onmessage = null;
      socket.close();
    };
  }, [conversationId, handleMessage]);

  const handleInsertUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user: idUser }),
      });
      const data = await response.json();
      alert('Usuario insertado: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateConversation = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:4000/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_participants: idParticipants.split(',').map(id => id.trim()) }),
      });
      const data = await response.json();
      alert('Conversación creada: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const message = {
        conversation_id: conversationId,
        sender_id: senderId,
        content: messageContent,
        timestamp: new Date().toISOString(),
      };

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket no está abierto');
      }

      setMessageContent('');  // Limpiar el campo de mensaje después de enviar
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Commette Chat</h1>

      <h2>Insertar Usuario</h2>
      <form onSubmit={handleInsertUser}>
        <label htmlFor="id_user">ID Usuario:</label>
        <input type="text" id="id_user" value={idUser} onChange={(e) => setIdUser(e.target.value)} required />
        <button type="submit">Insertar Usuario</button>
      </form>

      <h2>Crear Conversación</h2>
      <form onSubmit={handleCreateConversation}>
        <label htmlFor="id_participants">ID Participantes (separados por comas):</label>
        <input type="text" id="id_participants" value={idParticipants} onChange={(e) => setIdParticipants(e.target.value)} required />
        <button type="submit">Crear Conversación</button>
      </form>

      <h2>Enviar Mensaje</h2>
      <form onSubmit={handleSendMessage}>
        <label htmlFor="conversation_id">Conversation ID:</label>
        <input type="text" id="conversation_id" value={conversationId} onChange={(e) => setConversationId(e.target.value)} required />
        <label htmlFor="sender_id">Sender ID:</label>
        <input type="text" id="sender_id" value={senderId} onChange={(e) => setSenderId(e.target.value)} required />
        <label htmlFor="message_content">Message Content:</label>
        <input type="text" id="message_content" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} required />
        <button type="submit">Send Message</button>
      </form>

      <div id="messages" className="message-container">
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender_id}: {message.content} ({new Date(message.timestamp).toLocaleTimeString()})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;