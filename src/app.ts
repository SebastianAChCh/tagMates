import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import busboy from 'connect-busboy';
import cookieParser from 'cookie-parser';
import { Server, Socket } from 'socket.io'
import { createServer } from 'node:http'
import SessionsRoutes from './routes/Sessions.routes';
import Bans from './routes/Bans.routes';
import Position from './routes/Position.routes';
import Messages from './routes/Messages.routes'
import { PORT } from './configurations/conf';
import { dbRealTime } from './configurations/firebaseAdmin'
import { Message, MessageTaggy } from './types/Messages'
import { UsersModel, usersSocket } from './types/Users';
import Contacts from './routes/Contacts.routes';
import { checkResponseType, RequestsType } from './types/Requests';
import { Requests } from './services/Requests.service';
import { Positions } from './services/Positions.service';
import TaggyRt from './routes/Taggy.routes';
import UsersInfo from './routes/UserInformation.routes';
import HealthInfo from './routes/Health.routes';
import { Taggy } from './services/Taggy.service';

const app = express();
const nodeServer = createServer(app);
const socketIo = new Server(nodeServer, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 300000,
  },
  maxHttpBufferSize: 5e8,
  cors: {
    origin: '*'
  }
});


app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  methods: '*'
}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(busboy());
app.use(cookieParser());

//routes
app.use(SessionsRoutes);
app.use(Bans);
app.use(Position);
app.use(Contacts);
app.use(Messages);
app.use(UsersInfo);
app.use(TaggyRt);//TaggyRt is TaggyRoute
app.use(HealthInfo);

//Users online in the chat
let Users: usersSocket[] = [];

//Function to add the new users online in the chat
const addUser = (username: string, socketId: string) => !Users.some((user: usersSocket) => user.user === username) && Users.push({ user: username, socketId });

//Function to eliminate the users when disconnect from the chat
const deleteUsers = (socketId: string) => (Users = Users.filter((user: usersSocket) => user.socketId !== socketId));

//This method is used when a user updated their coordinates or when a new user is added
const userCoord = (users: UsersModel, socket: Socket) => {
  const userIsNear: UsersModel[] | null = [];
  const position = new Positions();

  Users.map(async (user) => {
    const coord = await position.getCoordinatesUser(user.user);

    //coordinates1 is the current positions of every user, and coordinates2 is the current positions of the user who has moved of their prev pos
    if (users.coordinates && coord && typeof coord !== 'string' && coord.range && coord.coordinates) {
      const coord1 = {
        ...coord.coordinates,
        radius: coord.range
      }
      const isNear: boolean = position.calculateDistance({ coordinates1: coord1, coordinates2: users.coordinates, radius: 0 });
      if (isNear) userIsNear.push(users);
    }
  });

  Users.map(userA => {
    userIsNear.map(userB => {
      if (userA.user === userB.email) {
        socket.to(userA.socketId).emit('positionUser', userB);
      }
    });
  })

}

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
    userCoord(users.val(), serverIo);
  }, (errorObject) => console.error('The read failed: ' + errorObject.name));

  //detects when the position of a user has changed
  dbRealTime.ref('Users').on('child_changed', (users) => {
    userCoord(users.val(), serverIo);
  }, (errorObject) => console.error('The read failed: ' + errorObject.name));

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
        if (message.type === 'text') {
          socketIo.to(user.socketId).emit('MessageText', { messageInfo: message });
        } else {
          socketIo.to(user.socketId).emit('MessageFile', { messageInfo: message });
        }
      }
    })

  });

  serverIo.on('MessageTaggy', (message: MessageTaggy) => {
    const TaggyMethods = new Taggy();
    let responseMessage: any;
    (async () => {
      responseMessage = await TaggyMethods.getMessage(message);
    });

    Users.forEach(user => {
      if (user.user === message.user) {
        socketIo.to(user.socketId).emit('ResponseTaggy', responseMessage);
      }
    })

  });

});

nodeServer.listen(PORT, () => {
  console.log('Listen on port', PORT);
});
