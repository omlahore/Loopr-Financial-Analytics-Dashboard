"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
// Protected routes
router.get('/me', auth_2.auth, auth_1.getCurrentUser);
exports.default = router;
