// schema.
class Artist {
    name

    constructor(name) {
        this.name = name;
    }
}

class Song {
    title;
    artist;
    duration;

    constructor(title, artist, duration) {
        this.title = title;
        this.artist = artist;
        this.duration = duration;
    }
}


// instances.
const data = [
    new Song("title1", [new Artist("name1"), new Artist("name2")], 1),
    new Song("title2", [new Artist("name3"), new Artist("name4")], 2),
];

function randomTrue() {
    // generate a random number between 0 and 1
    let randomNumber = Math.random();
    console.log(randomNumber);
    // if the random number is less than 0.2, return true
    if (randomNumber < 0.2) {
        return true;
    }
    // otherwise, return false
    else {
        return false;
    }
}


// simulate i/o task
const dataPromise = new Promise((resolve, reject) => {
    try {
        if (randomTrue()) reject("20% chance will failed.");
        else setTimeout(() => resolve(data), 2000);
    } catch (error) {
        reject(error)
    }
});

async function runner() {
    // async
    dataPromise
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });


    // sync
    try {
        console.log(await dataPromise);
    }
    catch (error) {
        console.log(error)
    }
}


runner();