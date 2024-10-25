const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    discription: { type: String, required: true },
    offers: { type: String, required: true }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;