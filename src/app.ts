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
import Contacts from './routes/Contacts.routes';
import { checkResponseType, RequestsType } from './types/Requests';
import { Requests } from './services/Requests.service';
import { Positions } from './services/Positions.service';

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

//Users online in the chat
let Users: usersSocket[] = [];

//Function to add the new users online in the chat
const addUser = (username: string, socketId: string) => !Users.some((user: usersSocket) => user.user === username) && Users.push({ user: username, socketId });

//Function to eliminate the users when disconnect from the chat
const deleteUsers = (socketId: string) => (Users = Users.filter((user: usersSocket) => user.socketId !== socketId));

socketIo.on('connection', (serverIo: Socket) => {
  const requests = new Requests();
  serverIo.on('connected', (email) => {
    addUser(email, serverIo.id);
  });

  serverIo.on('disconnect', () => {
    deleteUsers(serverIo.id);
  });

  //detects when a new user is created
  dbRealTime.ref('Users').on('child_added', (users) => {
    console.log('child_added', users.val());
  }, (errorObject) => console.log('The read failed: ' + errorObject.name));

  //detects when the position of a user has changed
  dbRealTime.ref('Users').on('child_changed', (users) => {
    const position = new Positions();

    Users.map(async (user) => {
      const coord = await position.getCoordinatesUser(user.user);

      //coordinates1 is the current positions of every user, and coordinates2 is the current positions of the user who has moved of their prev pos
      const isNear = position.calculateDistance({ coordinates1: coord, coordinates2: users.val().coordinates });
    });
  }, (errorObject) => console.log('The read failed: ' + errorObject.name));

  //when the user send the request it'll be sent to socket.io and will be send through it to tell at the user if is connected in that moment that a new request has came otherwise
  //the request will be saved so that the user can accepted or rejected
  serverIo.on('Request', (data: RequestsType) => {
    let acceptRequest: string = '';
    Users.forEach(user => {
      if (user.user === data.receiver) {
        socketIo.to(user.socketId).emit('RequestUser', acceptRequest);
        //the request will be saved in the database just in case the user does not accept it immediately
        requests.addRequest({ sender: data.sender, receiver: data.receiver });
      }
    });
  });

  serverIo.on('ReqAccRej', (data: checkResponseType) => {
    Users.forEach(user => {
      if (user.user === data.receiver) {
        requests.checkResponse({ response: data.response, receiver: data.receiver, sender: data.sender });
        // Implementation of a method with socket.io that tells the user if it request was either rejected or accepted
        socketIo.to(user.socketId).emit('ResponseRequest', { response: data.response });
      }
    });
  });

  serverIo.on('Message', (message: Message) => {
    Users.forEach(user => {
      if (user.user === message.receiver) {
        socketIo.to(user.socketId).emit('Message', message);
      }
    })

  });
});

nodeServer.listen(PORT, () => {
  console.log('Listen on port', PORT);
});
