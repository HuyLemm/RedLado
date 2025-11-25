"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const notFoundHandler = (req, _res, next) => {
    next((0, http_errors_1.default)(404, `Route ${req.originalUrl} not found`));
};
exports.notFoundHandler = notFoundHandler;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err, _req, res, _next) => {
    const status = err.status ?? 500;
    const payload = {
        status,
        message: err.message ?? 'Unexpected error',
    };
    if (process.env.NODE_ENV !== 'production' && err.stack) {
        Object.assign(payload, { stack: err.stack });
    }
    res.status(status).json(payload);
};
exports.errorHandler = errorHandler;
