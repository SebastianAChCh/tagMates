import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import busboy from 'connect-busboy';
import { Server, Socket } from 'socket.io'
import { createServer } from 'node:http'
import SessionsRoutes from './routes/Sessions.routes';
import Bans from './routes/Bans.routes';
import Position from './routes/Position.routes';
import Messages from './routes/Messages.routes'
import { PORT } from './configurations/conf';
import { dbRealTime } from './configurations/firebaseAdmin'
import { Message } from './types/Messages'
import { usersSocket } from './types/Users';
import Contacts from './routes/Contacts.routes'

const app = express();
const nodeServer = createServer(app);
const socketIo = new Server(nodeServer, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 300000,
  },
  maxHttpBufferSize: 5e8
});


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(busboy());

//routes
app.use(SessionsRoutes);
app.use(Bans);
app.use(Position);
app.use(Contacts);
app.use(Messages);

//detects when a new user is created
dbRealTime.ref('Users').on('child_added', (users) => {
  console.log(users.val());
}, (errorObject) => console.log('The read failed: ' + errorObject.name));

//detects when the position of a user has changed
dbRealTime.ref('Users').on('child_changed', (users) => {
  console.log(users.val());
}, (errorObject) => console.log('The read failed: ' + errorObject.name));

//Users online in the chat
let Users: usersSocket[] = [];

//Function to add the new users online in the chat
const addUser = (username: string, socketId: string) => !Users.some((user: usersSocket) => user.user === username) && Users.push({ user: username, socketId });

//Function to eliminate the users when disconnect from the chat
const deleteUsers = (socketId: string) => (Users = Users.filter((user: usersSocket) => user.socketId !== socketId));

socketIo.on('connection', (serverIo: Socket) => {
  serverIo.on('connected', (email) => {
    addUser(email, serverIo.id);
  });

  serverIo.on('disconnect', () => {
    deleteUsers(serverIo.id);
  });

  serverIo.on('Message', (message: Message) => {
    Users.forEach(user => {
      if (user.user === message.receiver) {
        socketIo.to(user.socketId).emit('Message', message);
      }
    })

    switch (message.type) {
      case 'Text':
        break;
      case 'File':
        break;
      default:
        console.error('There was an error, the server cannot manage that kind of messages');
        break;
    }
  });
});

//The port where the server is active
nodeServer.listen(PORT, () => {
  console.log('Listen on port', PORT);
});
