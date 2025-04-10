const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    quantity: { type: Number, required: true },
    location: String,
    expiryDate: Date,
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Food', foodSchema);
