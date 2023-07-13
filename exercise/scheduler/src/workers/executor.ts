import Executor from "../usecases/executor";

const executor = new Executor([]);
process.on('message', ({event, payload}) => {
    switch (event) {
        case "start":
            setInterval(() => {
                executor.execute();
            }, 500);
            break;
        case "push":
            executor.data!.push(payload);
            console.log("Pushed: ", payload);
            break;
    }
})