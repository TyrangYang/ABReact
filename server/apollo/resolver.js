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
        // TEMP
        getEventID: async (parent) => {
            let res = await eventModel.find();
            return res[0]._id;
        },
        // TEMP
        getUserID: async (parent) => {
            let res = await userModel.find();
            return res[0]._id;
        },
        getUserInfoByID: async (parent, { userID }) => {
            return await userModel.findById(userID);
        },
        getEventInfoByID: async (parent, { eventID }) => {
            return await eventModel.findById(eventID);
        },
        getInvolversInUser: async (parent, { userID }) => {
            let { involverIDs } = await userModel.findById(userID);
            return await involverModel.find({ _id: { $in: involverIDs } });
        },
        getInvolversInEvent: async (parent, { eventID }) => {
            let { allInvolverIDs } = await eventModel.findById(eventID);
            return await involverModel.find({ _id: { $in: allInvolverIDs } });
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
        refetch: () => ({}),
    },
    Bill: {
        payer: async (parent, args) => {
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
        refetch: () => ({}),
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
            let res1 = await eventModel.updateOne(
                { _id: eventID },
                { $push: { allInvolverIDs: involverID } }
            );
            if (!res1.nModified) return null;
            return await involverModel.findOneAndUpdate(
                { _id: involverID },
                { $push: { joinedEventIDs: eventID } }
            );
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

        removeBillFromEvent: async (parent, args) => {
            let { eventID, billID } = args;
            let { nModified } = await eventModel.updateOne(
                { _id: eventID },
                { $pull: { allBillIDs: billID } }
            );
            if (!nModified) return false;
            let { deletedCount } = await billModel.deleteOne({ _id: billID });
            if (!deletedCount) return false;
            return true;
        },

        involverLeaveEvent: async (parent, args) => {
            let { eventID, involverID } = args;
            // check all bills
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
