"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_busboy_1 = __importDefault(require("connect-busboy"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const Sessions_routes_1 = __importDefault(require("./routes/Sessions.routes"));
const Bans_routes_1 = __importDefault(require("./routes/Bans.routes"));
const Position_routes_1 = __importDefault(require("./routes/Position.routes"));
const Messages_routes_1 = __importDefault(require("./routes/Messages.routes"));
const conf_1 = require("./configurations/conf");
const firebaseAdmin_1 = require("./configurations/firebaseAdmin");
const Contacts_routes_1 = __importDefault(require("./routes/Contacts.routes"));
const Requests_service_1 = require("./services/Requests.service");
const Positions_service_1 = require("./services/Positions.service");
const Taggy_routes_1 = __importDefault(require("./routes/Taggy.routes"));
const UserInformation_routes_1 = __importDefault(require("./routes/UserInformation.routes"));
const Taggy_service_1 = require("./services/Taggy.service");
const app = (0, express_1.default)();
const nodeServer = (0, node_http_1.createServer)(app);
const socketIo = new socket_io_1.Server(nodeServer, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 300000,
    },
    maxHttpBufferSize: 5e8
});
// app.use(morgan('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, connect_busboy_1.default)());
app.use((0, cookie_parser_1.default)());
//routes
app.use(Sessions_routes_1.default);
app.use(Bans_routes_1.default);
app.use(Position_routes_1.default);
app.use(Contacts_routes_1.default);
app.use(Messages_routes_1.default);
app.use(UserInformation_routes_1.default);
app.use(Taggy_routes_1.default); //TaggyRt is TaggyRoute
//Users online in the chat
let Users = [];
//Function to add the new users online in the chat
const addUser = (username, socketId) => !Users.some((user) => user.user === username) && Users.push({ user: username, socketId });
//Function to eliminate the users when disconnect from the chat
const deleteUsers = (socketId) => (Users = Users.filter((user) => user.socketId !== socketId));
//This method is used when a user updated their coordinates or when a new user is added
const userCoord = (users, socket) => {
    const userIsNear = [];
    const position = new Positions_service_1.Positions();
    Users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const coord = yield position.getCoordinatesUser(user.user);
        //coordinates1 is the current positions of every user, and coordinates2 is the current positions of the user who has moved of their prev pos
        if (users.coordinates && coord && typeof coord !== 'string' && coord.range && coord.coordinates) {
            const coord1 = Object.assign(Object.assign({}, coord.coordinates), { radius: coord.range });
            const isNear = position.calculateDistance({ coordinates1: coord1, coordinates2: users.coordinates, radius: 0 });
            if (isNear)
                userIsNear.push(users);
        }
    }));
    Users.map(userA => {
        userIsNear.map(userB => {
            if (userA.user === userB.email) {
                socket.to(userA.socketId).emit('positionUser', userB);
            }
        });
    });
};
socketIo.on('connection', (serverIo) => {
    const requests = new Requests_service_1.Requests();
    serverIo.on('connected', (email) => {
        addUser(email, serverIo.id);
    });
    serverIo.on('disconnect', () => {
        deleteUsers(serverIo.id);
    });
    //detects when a new user is created
    firebaseAdmin_1.dbRealTime.ref('Users').on('child_added', (users) => {
        userCoord(users.val(), serverIo);
    }, (errorObject) => console.error('The read failed: ' + errorObject.name));
    //detects when the position of a user has changed
    firebaseAdmin_1.dbRealTime.ref('Users').on('child_changed', (users) => {
        userCoord(users.val(), serverIo);
    }, (errorObject) => console.error('The read failed: ' + errorObject.name));
    //when the user send the request it'll be sent to socket.io and will be send through it to tell at the user if is connected in that moment that a new request has came otherwise
    //the request will be saved so that the user can accepted or rejected
    serverIo.on('Request', (data) => {
        let acceptRequest = '';
        Users.forEach(user => {
            if (user.user === data.receiver) {
                socketIo.to(user.socketId).emit('RequestUser', acceptRequest);
                //the request will be saved in the database just in case the user does not accept it immediately
                requests.addRequest({ sender: data.sender, receiver: data.receiver });
            }
        });
    });
    serverIo.on('ReqAccRej', (data) => {
        Users.forEach(user => {
            if (user.user === data.receiver) {
                requests.checkResponse({ response: data.response, receiver: data.receiver, sender: data.sender });
                // Implementation of a method with socket.io that tells the user if it request was either rejected or accepted
                socketIo.to(user.socketId).emit('ResponseRequest', { response: data.response });
            }
        });
    });
    serverIo.on('Message', (message) => {
        Users.forEach(user => {
            if (user.user === message.receiver) {
                socketIo.to(user.socketId).emit('Message', message);
            }
        });
    });
    serverIo.on('MessageTaggy', (message) => {
        const TaggyMethods = new Taggy_service_1.Taggy();
        let responseMessage;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            responseMessage = yield TaggyMethods.getMessage(message);
        }));
        Users.forEach(user => {
            if (user.user === message.user) {
                socketIo.to(user.socketId).emit('ResponseTaggy', responseMessage);
            }
        });
    });
});
nodeServer.listen(conf_1.PORT, () => {
    console.log('Listen on port', conf_1.PORT);
});
//# sourceMappingURL=app.js.map