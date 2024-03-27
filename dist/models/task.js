"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Task", taskSchema);
