"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(30).optional(),
    email: zod_1.z.string().email().optional(),
    bio: zod_1.z.string().max(500).optional(),
    location: zod_1.z.string().max(120).optional(),
    favoriteGenres: zod_1.z.string().max(120).optional(),
    steamProfile: zod_1.z.string().max(120).optional(),
    discordTag: zod_1.z.string().max(37).optional(),
    avatar: zod_1.z.string().url().optional(),
});
