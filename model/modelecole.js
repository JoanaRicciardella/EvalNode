const mongoose = require('mongoose');


//schema pour ecole

var ecoleSchema = mongoose.Schema({

    name: String,
    adress: String,
    departement: String

});

var ecole = mongoose.model('ecole', ecoleSchema);

module.exports = ecole;








