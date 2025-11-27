"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const profileService_1 = require("../../services/profile/profileService");
const updateProfileController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        if (!Object.keys(updates).length) {
            throw (0, http_errors_1.default)(400, 'At least one field must be provided');
        }
        const user = await (0, profileService_1.updateUserProfile)(userId, updates);
        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                username: user.username,
                role: user.role,
                bio: user.bio,
                location: user.location,
                favoriteGenres: user.favoriteGenres,
                steamProfile: user.steamProfile,
                discordTag: user.discordTag,
                avatar: user.avatar,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfileController = updateProfileController;
