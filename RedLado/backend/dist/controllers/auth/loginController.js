"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const authService_1 = require("../../services/auth/authService");
const token_1 = require("../../utils/token");
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user } = await (0, authService_1.authenticateUser)(email, password);
        const token = (0, token_1.createMockToken)(user.id);
        res.json({
            message: 'Login successful',
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
exports.loginController = loginController;
