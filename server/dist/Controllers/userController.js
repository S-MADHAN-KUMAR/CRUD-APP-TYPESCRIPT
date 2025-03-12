"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
exports.getUsers = getUsers;
// Get a single user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});
exports.getUserById = getUserById;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        console.log(name, email);
        const newUser = new userModel_1.default({ name, email });
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});
exports.createUser = createUser;
// Update user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});
exports.updateUser = updateUser;
// Delete user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        const deletedUser = yield userModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});
exports.deleteUser = deleteUser;
