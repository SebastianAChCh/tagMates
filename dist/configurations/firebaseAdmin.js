"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamp = exports.dbRealTime = exports.dbFirestore = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
Object.defineProperty(exports, "Timestamp", { enumerable: true, get: function () { return firestore_1.Timestamp; } });
const database_1 = require("firebase-admin/database");
(0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
    databaseURL: 'https://tagmates-42c3a-default-rtdb.firebaseio.com/',
});
const dbFirestore = (0, firestore_1.getFirestore)();
exports.dbFirestore = dbFirestore;
const dbRealTime = (0, database_1.getDatabase)();
exports.dbRealTime = dbRealTime;
exports.default = dbFirestore;
//# sourceMappingURL=firebaseAdmin.js.map