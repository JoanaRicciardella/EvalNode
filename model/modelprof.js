const mongoose = require('mongoose');

//schema pour prof

var profSchema = mongoose.Schema({

    name: String,
    prenom: String,
    date: String,
    adress: String

});

var prof = mongoose.model('prof', profSchema);

module.exports = prof;