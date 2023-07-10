"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json({ type: '*/*' }));
app.get('/', (req, res) => {
    res.render('./app.ejs');
});
app.post('/calculate', (req, res) => {
    const { numbers, operator } = req.body;
    let result = 0;
    switch (operator) {
        case 'add':
            result = numbers.reduce((acc, curr) => acc + curr, 0);
            break;
        case 'subtract':
            result = numbers.reduce((acc, curr) => acc - curr, 0);
            break;
        case 'multiply':
            result = numbers.reduce((acc, curr) => acc * curr, 1);
            break;
        case 'divide':
            result = numbers.reduce((acc, curr) => acc / curr, 1);
            break;
        default:
            throw new Error('Operator is not supported.');
    }
    res.json(result);
});
app.listen(port, () => {
    console.log(`App listening at port ${port}.`);
});
