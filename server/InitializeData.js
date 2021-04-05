const moment = require('moment');
const databaseConfig = require('./database/databaseConfig.json');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const { eventModel, involverModel, billModel, userModel } = require('./database/model');

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
    let password = await bcrypt.hash('123', 5);
    let user = new userModel({
        email: 'test@test.com',
        name: 'userName1',
        password: password,
        eventIDs: [],
        involverIDs: [],
        tokenVersion: 1,
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
    await userModel.updateOne({ _id: userID }, { $push: { eventIDs: eventID } });
    await event.save();

    // 3. Create involver and add this involver to user
    let involversList = [];
    for (let i = 1; i <= 10; i++) {
        let tmpInvolver = new involverModel({
            joinedUserID: userID,
            joinedEventIDs: [],
            name: 'involver' + i,
        });
        involversList.push(tmpInvolver);
        tmpInvolverID = tmpInvolver.id;
        await tmpInvolver.save();
        await userModel.updateOne({ _id: userID }, { $push: { involverIDs: tmpInvolverID } });
    }

    // 4. Involver join in the event

    for (let i = 0; i < 6; i++) {
        let { id } = involversList[i];

        await involverModel.updateOne({ _id: id }, { $push: { joinedEventIDs: eventID } });

        await eventModel.updateOne({ _id: eventID }, { $push: { allInvolverIDs: id } });
    }

    // 5. add Bill to event
    let billList = [];
    let createNewBill = async (billList, eventID, payerID, amount, participantsID, date) => {
        let bill = new billModel({
            eventID,
            payerID,
            amount,
            participantsID,
            date,
        });

        await bill.save();
        billList.push(bill);

        await eventModel.updateOne({ _id: eventID }, { $push: { allBillIDs: bill.id } });
    };

    for (let i = 0; i < 1; ++i) {
        await createNewBill(
            billList,
            eventID,
            involversList[0].id,
            {
                amount: 10000,
                currency: 'USD',
                precision: 2,
            },
            [involversList[0].id, involversList[1].id],
            moment().format('YYYY-MM-DD')
        );
        await createNewBill(
            billList,
            eventID,
            involversList[1].id,
            {
                amount: 40000,
                currency: 'USD',
                precision: 2,
            },
            [involversList[0].id, involversList[1].id, involversList[2].id],
            moment().format('YYYY-MM-DD')
        );
        await createNewBill(
            billList,
            eventID,
            involversList[2].id,
            {
                amount: 50030,
                currency: 'USD',
                precision: 2,
            },
            [involversList[2].id, involversList[1].id],
            moment().format('YYYY-MM-DD')
        );
        await createNewBill(
            billList,
            eventID,
            involversList[3].id,
            {
                amount: 20045,
                currency: 'USD',
                precision: 2,
            },
            [involversList[0].id, involversList[4].id],
            moment().format('YYYY-MM-DD')
        );
        await createNewBill(
            billList,
            eventID,
            involversList[1].id,
            {
                amount: 10072,
                currency: 'USD',
                precision: 2,
            },
            [involversList[4].id],
            moment().format('YYYY-MM-DD')
        );
        await createNewBill(
            billList,
            eventID,
            involversList[2].id,
            {
                amount: 7063,
                currency: 'USD',
                precision: 2,
            },
            [
                involversList[0].id,
                involversList[1].id,
                involversList[2].id,
                involversList[3].id,
                involversList[4].id,
            ],
            moment().format('YYYY-MM-DD')
        );
    }
    // TODO: logout information

    // create empty user2
    let password2 = await bcrypt.hash('1234', 5);
    let user2 = new userModel({
        email: 'test2@test.com',
        name: 'userName2',
        password: password2,
        eventIDs: [],
        involverIDs: [],
        tokenVersion: 1,
    });
    const userID2 = user2.id;
    await user2.save();

    console.log('# $userID1:', userID);
    console.log('# $userID2:', userID2);
    console.log('# $eventID', eventID);

    console.log('----finish----');
    await db.close();
};

main();
