const {
    connect: databaseConnect,
    close,
    drop,
} = require('./database/dbConnection');
const databaseConfig = require('./database/databaseConfig.json');

const mongoose = require('mongoose');
const {
    eventModel,
    involverModel,
    billModel,
    userModel,
} = require('./database/model');

let main = async () => {
    mongoose.connect(databaseConfig.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // connect db
    const db = mongoose.connection;
    let res = await db.once('open', () => {
        console.log('----connected to database----'.toUpperCase());
    });
    // drop existing data
    try {
        await res.db.dropDatabase();
    } catch (e) {
        console.log('error:', e.codeName);
    }
    //  1. Create user
    let user = new userModel({
        email: 'test@test.com',
        name: 'userName1',
        eventIDs: [],
        involverIDs: [],
    });
    const userID = user.id;
    await user.save();

    // 2. Create event and add this event to user
    let event = new eventModel({
        eventOwnerID: userID,
        eventName: 'eventName1',
        eventCreateDate: '2020-01-01',
        allBillIDs: [],
        allInvolverIDs: [],
    });

    const eventID = event.id;
    await userModel.updateOne(
        { _id: userID },
        { $push: { eventIDs: eventID } }
    );
    await event.save();

    // 3. Create involver and add this involver to user
    let involversList = [];
    for (let i = 1; i <= 7; i++) {
        let tmpInvolver = new involverModel({
            joinedUserID: userID,
            joinedEventIDs: [],
            name: 'involver' + i,
        });
        involversList.push(tmpInvolver);
        tmpInvolverID = tmpInvolver.id;
        await tmpInvolver.save();
        await userModel.updateOne(
            { _id: userID },
            { $push: { involverIDs: tmpInvolverID } }
        );
    }

    // 4. Involver join in the event

    for (let i = 0; i < 4; i++) {
        let { id } = involversList[i];

        await involverModel.updateOne(
            { _id: id },
            { $push: { joinedEventIDs: eventID } }
        );

        await eventModel.updateOne(
            { _id: eventID },
            { $push: { allInvolverIDs: id } }
        );
    }

    // logout information

    console.log('TEST USER ID:', userID);
    console.log('TEST EVENT ID:', eventID);

    console.log('----finish----');
    await db.close();
};

main();
