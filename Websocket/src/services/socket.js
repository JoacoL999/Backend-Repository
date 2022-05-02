const socketIo = require('socket.io');
const { ProductosController } = require('../controller/productos');
const fs = require('fs');
const { formatMessages } = require('../utils/messages');
const {
  addUser,
  getCurrentUser,
  removeUser,
  getRoomUsers,
} = require('../utils/users');


let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');
    console.log(new Date());

    socket.on('allProducts', async () => {
      const productos = await ProductosController.getAll();

      productos.forEach((unProducto) => {
        socket.emit('producto', unProducto);
      });
    });
  });

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    //New User Joined room
    socket.on('JoinRoom', (msg) => {
      addUser(socket.client.id, msg.username, msg.room);
      const user = getCurrentUser(socket.client.id);

      socket.join();
 
      const oldM = 'msg.json'

      fs.readFile(oldM, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }

        let pep = JSON.parse(data)
        
        
        pep.map(pep => {
          const asd = {
            username: pep.username, 
            text: pep.text,
            time: pep.time,
          };
          socket.emit('message', asd);
          messages.push(formatMessages(asd))
          
          
        });
      })

      

      //BroadCast when a user connects
      socket.broadcast.to().emit('message', formatMessages(data));

      //Send Room info
      const roomInfo = {
        users: getRoomUsers(user),
      };
      io.to().emit('roomUsers', roomInfo);
    });

    //Let everyone knows that a user left the chat
    socket.on('disconnect', () => {
      const user = getCurrentUser(socket.client.id);
      if (user) {
        removeUser(socket.client.id);
        data.username = 'CHATBOT-BOTI';
        data.text = `${user.username} has left the chat`;
        io.to().emit('message', formatMessages(data)); 

        //Send Room info
        const roomInfo = {
          users: getRoomUsers(user),
        };
        io.to().emit('roomUsers', roomInfo);
      }
    });

    //Listen for chat messages
    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.client.id);
      data.username = user.username;
      data.text = msg;
      io.to().emit('message', formatMessages(data));
      messages.push(formatMessages(data))
      const pop = JSON.stringify(messages)
      fs.writeFile('msg.json', pop, (err) => {
        if (err) {
            throw err;
        }})

      
    });
  });
  return io;
};

const socketEmit = (eventName, message) => {
  io.emit(eventName, message);
};

const data = {
  username: undefined,
  text: undefined,
};

const messages = [];

const getWsServer = () => {
  return io;
}


module.exports = {
  initWsServer,
  socketEmit,
  getWsServer,
};




