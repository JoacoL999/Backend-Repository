import socketIo from 'socket.io';
import { getAllMessages, addMessage } from '../controllers/messages';

let io;

export const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', async (socket) => {
    console.log('LLEGO CONNECTION');

    let msges = await getAllMessages();
    socket.emit('receiveMessages', msges);

    socket.on('newMessage', (msg) => {
      console.log('LLEGO MENSAJE');
      console.log(msg)
      addMessage(msg);
      io.emit('newMessage', msg);
    });
  });

  return io;
};