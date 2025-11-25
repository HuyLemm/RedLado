"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const seedUsers = async () => {
    const existingUser = await user_model_1.UserModel.findOne({ email: 'demo@redlado.com' }).exec();
    if (existingUser) {
        return;
    }
    const passwordHash = await bcryptjs_1.default.hash('Password123!', 10);
    await user_model_1.UserModel.create({
        email: 'demo@redlado.com',
        name: 'Demo Trader',
        username: 'demotrader',
        passwordHash,
        role: 'buyer',
    });
};
exports.seedUsers = seedUsers;
