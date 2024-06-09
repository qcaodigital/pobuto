import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env.development` });
const { HOST_URL, SERVER_PORT, CLIENT_URL } = process.env;

const app = express();

app.use(cors({ origin: CLIENT_URL }));

app.get('/env', (_, res) => {
  res.send({ HOST_URL, SERVER_PORT });
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`Pobuto Poker server started on port :${SERVER_PORT}`);
});

const socketio = new Server(server);
socketio.on('connection', (socket) => {
  console.log('SocketIO connected.');

  socket.emit(
    'message',
    `Hello from Socket IO! Heres a random number: ${Math.random()}!`
  );
});
