"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ type: "*/*" }));
const PORT = 3000;
app.use("/api/v1", index_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
