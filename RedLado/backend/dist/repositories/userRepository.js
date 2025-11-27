"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
const user_model_1 = require("../models/user.model");
const mapDocumentToUser = (doc) => ({
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    username: doc.username,
    passwordHash: doc.passwordHash,
    role: doc.role,
    bio: doc.bio,
    location: doc.location,
    favoriteGenres: doc.favoriteGenres,
    steamProfile: doc.steamProfile,
    discordTag: doc.discordTag,
    avatar: doc.avatar,
});
const findUserByEmail = async (email) => {
    const user = await user_model_1.UserModel.findOne({ email: email.toLowerCase() }).exec();
    return user ? mapDocumentToUser(user) : null;
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    const user = await user_model_1.UserModel.findById(id).exec();
    return user ? mapDocumentToUser(user) : null;
};
exports.findUserById = findUserById;
const createUser = async (input) => {
    const user = await user_model_1.UserModel.create({
        email: input.email.toLowerCase(),
        name: input.name,
        username: input.username,
        passwordHash: input.passwordHash,
        role: input.role ?? 'buyer',
    });
    return mapDocumentToUser(user);
};
exports.createUser = createUser;
const updateUserById = async (id, updates) => {
    const normalizedUpdates = { ...updates };
    if (normalizedUpdates.email) {
        normalizedUpdates.email = normalizedUpdates.email.toLowerCase();
    }
    const user = await user_model_1.UserModel.findByIdAndUpdate(id, normalizedUpdates, { new: true }).exec();
    return user ? mapDocumentToUser(user) : null;
};
exports.updateUserById = updateUserById;
