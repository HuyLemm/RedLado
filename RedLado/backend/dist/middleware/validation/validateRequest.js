"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const validateRequest = (schema) => (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        const message = parsed.error.issues.map((issue) => issue.message).join(', ');
        return next((0, http_errors_1.default)(400, message));
    }
    req.body = parsed.data;
    return next();
};
exports.validateRequest = validateRequest;
