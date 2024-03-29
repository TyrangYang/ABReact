const { eventModel, involverModel, billModel, userModel } = require('./database/model');
const { verify } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const { createRefreshToken, createAccessToken } = require('./authToken');
// dataLoader for n+1 problem
const DataLoader = require('dataloader');

const payerLoader = new DataLoader((keys) => {
    // return promise
    let res = keys.map(async (payerID) => {
        return await involverModel.findById(payerID);
    });
    return Promise.resolve(res);
});
const participantLoader = new DataLoader((keys) => {
    let res = keys.map(async (participantID) => {
        return await involverModel.findById(participantID);
    });
    return Promise.resolve(res);
});

const getTokenInfo = (context) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error('No authorization felid in header');
    }

    try {
        const token = authorization.split(' ')[1];
        return verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new Error('not authorized');
    }
};

const checkEventOwner = (userID, event) => {
    if (event.eventOwnerID !== userID) throw new Error('ACCESS NOT ALLOW');
    return;
};

module.exports = {
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
            return await payerLoader.load(parent.payerID);
        },
        participants: async (parent, args) => {
            return await participantLoader.loadMany(parent.participantsID);
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
        getUserInfoByID: async (parent, _, context) => {
            const { userID } = getTokenInfo(context);
            return await userModel.findById(userID);
        },
        getEventsFromUser: async (parent, _, context) => {
            const { userID } = getTokenInfo(context);
            const { eventIDs } = await userModel.findById(userID);
            return await eventModel.find({ _id: { $in: eventIDs } });
        },

        getInvolversInUser: async (parent, _, context) => {
            const { userID } = getTokenInfo(context);
            let { involverIDs } = await userModel.findById(userID);
            return await involverModel.find({ _id: { $in: involverIDs } });
        },

        getEventInfoByID: async (parent, { eventID }, context) => {
            const { userID } = getTokenInfo(context);
            const event = await eventModel.findById(eventID);
            checkEventOwner(userID, event);
            return event;
        },

        getInvolversInEvent: async (parent, { eventID }, context) => {
            const { userID } = getTokenInfo(context);
            const event = await eventModel.findById(eventID);
            checkEventOwner(userID, event);
            let { allInvolverIDs } = event;
            return await involverModel.find({ _id: { $in: allInvolverIDs } });
        },

        getBillsInEvent: async (parent, { eventID }, context) => {
            const { userID } = getTokenInfo(context);
            const event = await eventModel.findById(eventID);
            checkEventOwner(userID, event);
            let { allBillIDs } = event;
            return await billModel.find({ _id: { $in: allBillIDs } });
        },
    },

    Mutation: {
        userLogin: async (parent, { email, password }, context) => {
            let user = await userModel.findOne({ email: email });
            if (!user) {
                throw new Error('email or password is incorrect');
            }
            let isCorrect = await bcrypt.compare(password, user.password);
            if (!isCorrect) {
                throw new Error('email or password is incorrect');
            }

            // user or password correct
            context.res.cookie('jid', createRefreshToken(user), {
                httpOnly: true,
            });
            return {
                accessToken: createAccessToken(user),
            };
        },
        userLogout: async (parent, _, context) => {
            context.res.cookie('jid', '', {
                httpOnly: true,
            });
            return true;
        },
        // TEMP : not used yet
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

        createNewEvent: async (parent, args, context) => {
            const { userID } = getTokenInfo(context);
            let { eventName, eventCreateDate } = args;
            let newEvent = new eventModel({
                eventOwnerID: userID,
                eventName,
                eventCreateDate: eventCreateDate ?? moment().format('YYYY-MM-DD'),
            });
            await userModel.updateOne({ _id: userID }, { $push: { eventIDs: newEvent.id } });
            return await newEvent.save();
        },

        createNewInvolverToUser: async (parent, args, context) => {
            const { userID } = getTokenInfo(context);
            let { involverName } = args;
            let newInvolver = new involverModel({
                name: involverName,
                joinedUserID: userID,
                joinedEventIDs: [],
            });
            await userModel.updateOne({ _id: userID }, { $push: { involverIDs: newInvolver.id } });
            return await newInvolver.save();
        },

        involverJoinEvent: async (parent, args, context) => {
            let { involverID, eventID } = args;
            checkEventOwner(getTokenInfo(context).userID, eventModel.findById(eventID));
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

        addNewBillToEvent: async (parent, args, context) => {
            let { eventID, payerID, amount, participantsID, date } = args;
            checkEventOwner(getTokenInfo(context).userID, eventModel.findById(eventID));
            let newBill = new billModel({
                eventID,
                payerID,
                amount,
                participantsID,
                date: date ?? moment().format('YYYY-MM-DD'),
            });

            await eventModel.updateOne({ _id: eventID }, { $push: { allBillIDs: newBill.id } });

            return await newBill.save();
        },

        removeBillFromEvent: async (parent, args, context) => {
            let { eventID, billID } = args;
            checkEventOwner(getTokenInfo(context).userID, eventModel.findById(eventID));
            let { nModified } = await eventModel.updateOne(
                { _id: eventID },
                { $pull: { allBillIDs: billID } }
            );
            if (!nModified) return null;
            return await billModel.findOneAndDelete({ _id: billID });
        },
        // TODO : Auth?

        involverLeaveEvent: async (parent, args) => {
            let { eventID, involverID } = args;
            // check all bills
        },
    },
};
