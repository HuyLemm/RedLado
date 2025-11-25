"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.authenticateUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const userRepository_1 = require("../../repositories/userRepository");
const password_1 = require("../../utils/password");
const authenticateUser = async (email, password) => {
    const user = await (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        throw (0, http_errors_1.default)(401, 'Invalid credentials');
    }
    const isValid = await (0, password_1.verifyPassword)(password, user.passwordHash);
    if (!isValid) {
        throw (0, http_errors_1.default)(401, 'Invalid credentials');
    }
    return { user };
};
exports.authenticateUser = authenticateUser;
const registerUser = async (input) => {
    const existingUser = await (0, userRepository_1.findUserByEmail)(input.email);
    if (existingUser) {
        throw (0, http_errors_1.default)(409, 'Email already registered');
    }
    const passwordHash = await (0, password_1.hashPassword)(input.password);
    const user = await (0, userRepository_1.createUser)({
        email: input.email,
        username: input.username,
        name: input.name,
        passwordHash,
    });
    return { user };
};
exports.registerUser = registerUser;
