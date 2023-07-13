import express from "express";
import bodyParser from "body-parser";
import Process from "./models/process";
import {fork} from "child_process";

const app = express();
app.use(bodyParser.json());

const port = 3000;

const executorChildProcess = fork("./dist/workers/executor.js");

executorChildProcess.send({event: "start", payload: undefined});


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    const {method, url, query, body, executeAt, isRepeated, repeatDelay, repeatCount} = req.body;

    const process = new Process(
        method, url, query, body, new Date(executeAt), isRepeated, repeatDelay, repeatCount,
    );

    executorChildProcess.send({event: "push", payload: process});
    res.send('A new process has inserted to queue');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})