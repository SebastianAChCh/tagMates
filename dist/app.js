"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const Sessions_routes_1 = __importDefault(require("./routes/Sessions.routes"));
const Bans_routes_1 = __importDefault(require("./routes/Bans.routes"));
const Position_routes_1 = __importDefault(require("./routes/Position.routes"));
const Messages_routes_1 = __importDefault(require("./routes/Messages.routes"));
const conf_1 = require("./configurations/conf");
const firebaseAdmin_1 = require("./configurations/firebaseAdmin");
const connect_busboy_1 = __importDefault(require("connect-busboy"));
const app = (0, express_1.default)();
const nodeServer = (0, node_http_1.createServer)(app);
const socketIo = new socket_io_1.Server(nodeServer, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 300000,
    },
    maxHttpBufferSize: 5e8
});
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, connect_busboy_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use(Sessions_routes_1.default);
app.use(Bans_routes_1.default);
app.use(Position_routes_1.default);
app.use(Messages_routes_1.default);
//detects when a new user is created
firebaseAdmin_1.dbRealTime.ref('Users').on('child_added', (users) => {
    console.log(users.val());
}, (errorObject) => console.log('The read failed: ' + errorObject.name));
//detects when the position of a user has changed
firebaseAdmin_1.dbRealTime.ref('Users').on('child_changed', (users) => {
    console.log(users.val());
}, (errorObject) => console.log('The read failed: ' + errorObject.name));
//Users online in the chat
let Users = [];
//Function to add the new users online in the chat
const addUser = (username, socketId) => !Users.some((user) => user.user === username) && Users.push({ user: username, socketId });
//Function to eliminate the users when disconnect from the chat
const deleteUsers = (socketId) => (Users = Users.filter((user) => user.socketId !== socketId));
//setting up of socket.io
socketIo.on('connection', (serverIo) => {
    serverIo.on('connected', (email) => {
        addUser(email, serverIo.id);
    });
    serverIo.on('disconnect', () => {
        deleteUsers(serverIo.id);
    });
    serverIo.on('Message', (message) => {
        Users.forEach(user => {
            if (user.user === message.receiver) {
                socketIo.to(user.socketId).emit('Message', message);
            }
        });
        switch (message.type) {
            case 'Text':
                break;
            case 'Img':
                break;
            default:
                console.error('There was an error, the server cannot manage that kind of messages');
                break;
        }
    });
});
//The port where the server is active
nodeServer.listen(conf_1.PORT, () => {
    console.log('Listen on port', conf_1.PORT);
});
//# sourceMappingURL=app.js.map