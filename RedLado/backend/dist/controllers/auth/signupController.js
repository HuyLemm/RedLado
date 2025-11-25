"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const authService_1 = require("../../services/auth/authService");
const token_1 = require("../../utils/token");
const signupController = async (req, res, next) => {
    try {
        const { email, password, username, name } = req.body;
        const { user } = await (0, authService_1.registerUser)({ email, password, username, name });
        const token = (0, token_1.createMockToken)(user.id);
        res.status(201).json({
            message: 'Signup successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                username: user.username,
                role: user.role,
            },
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signupController = signupController;
