"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const updateProfileController_1 = require("../../controllers/profile/updateProfileController");
const validateRequest_1 = require("../../middleware/validation/validateRequest");
const profileSchemas_1 = require("../../schemas/profileSchemas");
const profileRouter = (0, express_1.Router)();
profileRouter.patch('/:id', (0, validateRequest_1.validateRequest)(profileSchemas_1.updateProfileSchema), updateProfileController_1.updateProfileController);
exports.default = profileRouter;
