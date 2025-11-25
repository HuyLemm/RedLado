"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const userRepository_1 = require("../../repositories/userRepository");
const updateUserProfile = async (userId, updates) => {
    if (updates.email) {
        const existingUser = await (0, userRepository_1.findUserByEmail)(updates.email);
        if (existingUser && existingUser.id !== userId) {
            throw (0, http_errors_1.default)(409, 'Email already in use');
        }
    }
    const updatedUser = await (0, userRepository_1.updateUserById)(userId, updates);
    if (!updatedUser) {
        throw (0, http_errors_1.default)(404, 'User not found');
    }
    return updatedUser;
};
exports.updateUserProfile = updateUserProfile;
