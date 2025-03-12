"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const router = express_1.default.Router();
router.get("/getUsers", (req, res) => void (0, userController_1.getUsers)(req, res));
router.post("/createUser", (req, res) => void (0, userController_1.createUser)(req, res));
router.put("/update/:id", (req, res) => void (0, userController_1.updateUser)(req, res));
router.delete("/remove/:id", (req, res) => void (0, userController_1.deleteUser)(req, res));
exports.default = router;
