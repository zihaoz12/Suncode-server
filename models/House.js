const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    street: {type:String},
    address: { type : String },
    address2: { type : String },
    state: {type: String},
    zipcode: {type: String},
    year: {type: String},
    sqft: {type: String},
    memo: {type: String},
    // productImage: { type: String },
    productImage1: { type: String },
    productImage2: { type: String },
    // productImage3: { type: String, required: true },
    // productImage4: { type: String, required: true },
    userId: {type: String},
    username: {type: String},
    postingTime: {type: String},
    attic: {type: String},
    whyear: {type: String},
    whef: {type: String},
    whfuel: {type: String},
    heatyear: {type: String},
    heatef: {type: String},
    heatfuel: {type: String},
    status: {type: String},
    memo2: {type: String},
})

module.exports = mongoose.model('House', HouseSchema)