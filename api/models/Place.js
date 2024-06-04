const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PlaceSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    perks: [String],
    description: String,
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
});

const PlaceModel = model('Place', PlaceSchema);

module.exports = PlaceModel;