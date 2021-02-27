const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
    id: String,
    payer: String,
    amount: {
        amount: Number,
        currency: String,
        precision: Number,
    },
    participantsId: [String],
    date: Date,
});

const involverSchema = new Schema({
    id: String,
    name: String,
});

const eventSchema = new Schema({
    eventOwnerId: String,
    eventCreateDate: Date,
    allBills: [billSchema],
    allInvolvers: [involverSchema],
});

module.exports = mongoose.model('Event', eventSchema);
