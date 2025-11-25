"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockToken = void 0;
const crypto_1 = require("crypto");
const createMockToken = (userId) => `${userId}-${(0, crypto_1.randomUUID)()}`;
exports.createMockToken = createMockToken;
