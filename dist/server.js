"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT;
mongoose_1.default
    .connect(validateEnv_1.default.MONGODB_URI)
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(port, () => {
        console.log("Server running on port " + port);
    });
})
    .catch((err) => console.error(err));
