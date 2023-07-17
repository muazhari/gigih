// migration requirements using mongoose
// 1. Create a database that stores the following information:
// - Songs, containing the following data: the title of the song, the name of the artist(s), and the album
// - Artist.ts, containing the following data: name, date of birth, genre(s)
// - Popular Songs, containing the following data: the title of the song, how many times it’s played, period of time
//
// 2. Populate the database you’ve created above with at least 10 data for each collection

import dotenv from 'dotenv';
import OneDatastore from "./datastores/OneDatastore";
import OneMigration from "./migrations/OneMigration";

dotenv.config(
    {
        path: './.env'
    }
)

const main = async (): Promise<void> => {
    const oneDatastore: OneDatastore = new OneDatastore()
    await oneDatastore.connect()
        .then(() => console.log('Connected to one datastore.'))
        .catch((error: any) => console.log('Error connecting to one datastore: ', error))

    const oneMigration: OneMigration = new OneMigration(oneDatastore)

    await oneMigration.up()
    // await oneMigration.down()
}

main()
    .then(() => console.log('Migration completed.'))
    .catch((error: any) => console.log('Error migrating: ', error))






