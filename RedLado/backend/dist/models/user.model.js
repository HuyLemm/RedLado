"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer',
    },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    favoriteGenres: { type: String, default: '' },
    steamProfile: { type: String, default: '' },
    discordTag: { type: String, default: '' },
    avatar: { type: String, default: '' },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
