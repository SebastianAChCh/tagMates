"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api_secret = exports.api_key = exports.cloud_name = exports.measurementId = exports.appId = exports.messagingSenderId = exports.storageBucket = exports.projectId = exports.authDomain = exports.apiKey = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 3000;
exports.apiKey = process.env.apiKey;
exports.authDomain = process.env.authDomain;
exports.projectId = process.env.projectId;
exports.storageBucket = process.env.storageBucket;
exports.messagingSenderId = process.env.messagingSenderId;
exports.appId = process.env.appId;
exports.measurementId = process.env.measurementId;
exports.cloud_name = process.env.cloud_name;
exports.api_key = process.env.api_key;
exports.api_secret = process.env.api_secret;
//# sourceMappingURL=conf.js.map