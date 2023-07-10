import express from 'express';

const app = express();
const port = 3000;

app.use(express.json({ type: '*/*' }));

app.get('/', (req: any, res: any) => {
    res.render('./app.ejs');
})

app.post('/calculate', (req: any, res: any) => {
    const { numbers, operator } = req.body;

    let result = 0;

    switch (operator) {
        case 'add':
            result = numbers.reduce((acc: any, curr: any) => acc + curr, 0);
            break;
        case 'subtract':
            result = numbers.reduce((acc: any, curr: any) => acc - curr, 0);
            break;
        case 'multiply':
            result = numbers.reduce((acc: any, curr: any) => acc * curr, 1);
            break;
        case 'divide':
            result = numbers.reduce((acc: any, curr: any) => acc / curr, 1);
            break;
        default:
            throw new Error('Operator is not supported.');
    }

    res.json(result);
})

app.listen(port, () => {
    console.log(`App listening at port ${port}.`)
})