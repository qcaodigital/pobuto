import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
const API_URL = `${import.meta.env.VITE_HOST_URL}:${import.meta.env.VITE_SERVER_PORT}`;

interface ServerToClientEvents {
  message: (message: string) => void;
}

export const App = () => {
  const [message, setMessage] = useState<string>('Connecting to Socket IO..');

  useEffect(() => {
    const socket: Socket<ServerToClientEvents> = io(API_URL, {
      transports: ['websocket'],
    });

    socket.on('message', (message) => {
      setMessage(message);
    });

    socket.on('connect_error', (err) => {
      console.error(err);
      setMessage('Failed to connect to Socket IO');
    });
  }, []);

  return <p>{message}</p>;
};
