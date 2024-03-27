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
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find().exec();
        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getTasks = getTasks;
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority || "low";
    const status = req.body.status || false;
    try {
        if (!title) {
            throw (0, http_errors_1.default)(400, "Title is required");
        }
        const newTask = yield task_1.default.create({
            title,
            description,
            priority,
            status,
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw (0, http_errors_1.default)(400, "Invalid task id");
        const task = yield task_1.default.findById(id).exec();
        if (!task)
            throw (0, http_errors_1.default)(404, "Task not found");
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.getTask = getTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newPriority = req.body.priority;
    const newStatus = req.body.status;
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw (0, http_errors_1.default)(400, "Invalid task id");
        if (!newTitle)
            throw (0, http_errors_1.default)(400, "Title cannot be empty");
        const updatedTask = yield task_1.default.findByIdAndUpdate(id, {
            title: newTitle,
            description: newDescription,
            priority: newPriority,
            status: newStatus,
        });
        res.status(201).json(updatedTask);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw (0, http_errors_1.default)(400, "Invalid task ID");
        const task = yield task_1.default.findById(id).exec();
        if (!task)
            throw (0, http_errors_1.default)(404, "Note not found");
        yield task_1.default.findByIdAndDelete(id);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
