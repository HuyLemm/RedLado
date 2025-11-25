"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDatabase = async () => {
    if (!env_1.config.mongoUri) {
        throw new Error('MONGODB_URI is not configured');
    }
    try {
        await mongoose_1.default.connect(env_1.config.mongoUri);
        // eslint-disable-next-line no-console
        console.log('MongoDB connected');
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
