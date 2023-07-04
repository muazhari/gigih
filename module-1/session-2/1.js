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

const dataPromise = new Promise((resolve, reject) => {
    try {
        setTimeout(() => resolve(data), 2000)
    } catch (error) {
        reject(error)
    }
});

async function runner() {
    // async
    dataPromise
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });


    // sync
    console.log(await dataPromise);
}


runner();

const f2 = (...x) => {
    console.log(x);
}

f2(1,2,3,4)