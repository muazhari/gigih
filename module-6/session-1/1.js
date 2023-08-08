const main = async () => {
    // async format
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log("async", json))
        .catch(error => console.log("async", error));

    // sync format
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const json = await response.json();
        console.log("sync", json);
    } catch (error) {
        console.log("sync", error);
    }
}

main()
    .then(() => console.log('app started.'))
    .catch(error => console.log(error));
