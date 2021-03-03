const {
    eventModel,
    involverModel,
    billModel,
    userModel,
} = require('../database/model');

// let data = require('../db.json').event;

const moment = require('moment');

module.exports = {
    Query: {
        getAllUsers: async (parent, args) => {
            return await userModel.find();
        },
        getAllEvents: async (parent, args) => {
            return await eventModel.find();
        },
        getAllInvolver: async (parent, args) => {
            return await involverModel.find();
        },
        getAllBill: async (parent, args) => {
            return await billModel.find();
        },
    },
    User: {
        events: async (parent, args) => {
            return await eventModel.find({
                _id: { $in: parent.eventIDs },
            });
        },
        involvers: async (parent, args) => {
            return await involverModel.find({
                _id: { $in: parent.involverIDs },
            });
        },
    },
    Bill: {
        payer: async (parent, args) => {
            console.log(parent.payerID);
            return await involverModel.findById(parent.payerID);
        },
        participants: async (parent, args) => {
            return await involverModel.find({
                _id: {
                    $in: parent.participantsID,
                },
            });
        },
    },

    Event: {
        eventOwner: async (parent) => {
            return await userModel.findById(parent.eventOwnerID);
        },
        allBills: async (parent) => {
            return await billModel.find({ _id: { $in: parent.allBillIDs } });
        },
        allInvolvers: async (parent) => {
            return await involverModel.find({
                _id: { $in: parent.allInvolverIDs },
            });
        },
    },

    Involver: {
        joinedEvents: async (parent) => {
            return await eventModel.find({
                _id: { $in: parent.joinedEventIDs },
            });
        },
        joinedUser: async (parent) => {
            return await eventModel.find({
                _id: { $in: parent.joinedUserID },
            });
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            let { name, email } = args;
            let newUser = new userModel({
                name,
                email,
                eventIDs: [],
                involverIDs: [],
            });
            return await newUser.save();
        },
        createNewEvent: async (parent, args) => {
            let { eventOwnerID, eventName, eventCreateDate } = args;
            let newEvent = new eventModel({
                eventOwnerID,
                eventName,
                eventCreateDate:
                    eventCreateDate ?? moment().format('YYYY-MM-DD'),
            });
            await userModel.updateOne(
                { _id: eventOwnerID },
                { $push: { eventIDs: newEvent.id } }
            );
            return await newEvent.save();
        },
        joinNewInvolver: async (parent, args) => {
            let { userID, involverName } = args;
            let newInvolver = new involverModel({
                name: involverName,
                joinedUserID: userID,
                joinedEventIDs: [],
            });
            await userModel.updateOne(
                { _id: userID },
                { $push: { involverIDs: newInvolver.id } }
            );
            return await newInvolver.save();
        },
        involverJoinEvent: async (parent, args) => {
            let { involverID, eventID } = args;
            let res1 = await involverModel.updateOne(
                { _id: involverID },
                { $push: { joinedEventIDs: eventID } }
            );
            let res2 = await eventModel.updateOne(
                { _id: eventID },
                { $push: { allInvolverIDs: involverID } }
            );
            console.log(res1, res2);
            return res1.nModified && res2.nModified;
        },

        addNewBillToEvent: async (parent, args) => {
            let { eventID, payerID, amount, participantsID, date } = args;
            let newBill = new billModel({
                eventID,
                payerID,
                amount,
                participantsID,
                date: date ?? moment().format('YYYY-MM-DD'),
            });

            await eventModel.updateOne(
                { _id: eventID },
                { $push: { allBillIDs: newBill.id } }
            );

            return await newBill.save();
        },

        // removeEvent: async (parent, args) => {
        //     let { eventID } = args;
        //     await userModel.updateOne(
        //         { _id: eventOwnerID },
        //         { $pull: { eventIDs: eventID } }
        //     );
        //     return await eventModel.findOneAndRemove({ _id: eventID });
        // },
    },
};
