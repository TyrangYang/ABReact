const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    eventIDs: [String],
    involverIDs: [String],
    tokenVersion: Number,
});

const eventSchema = new Schema({
    eventOwnerID: String,
    eventName: String,
    eventCreateDate: Date,
    allBillIDs: [String],
    allInvolverIDs: [String],
});

const involverSchema = new Schema({
    joinedUserID: String,
    joinedEventIDs: [String],
    name: String,
});

const billSchema = new Schema({
    eventID: String,
    payerID: String,
    amount: {
        amount: Number,
        currency: String,
        precision: Number,
    },
    participantsID: [String],
    date: Date,
});

module.exports = {
    userModel: mongoose.model('User', userSchema),
    eventModel: mongoose.model('Event', eventSchema),
    billModel: mongoose.model('Bill', billSchema),
    involverModel: mongoose.model('Involver', involverSchema),
};
