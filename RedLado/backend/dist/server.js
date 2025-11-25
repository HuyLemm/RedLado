"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const userSeeder_1 = require("./seeders/userSeeder");
const PORT = Number(env_1.config.port);
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    await (0, userSeeder_1.seedUsers)();
    app_1.default.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Backend listening on port ${PORT}`);
    });
};
startServer();
