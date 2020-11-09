const mongoose = require('mongoose');

//schema pour eleve

var eleveSchema = mongoose.Schema({

    name: String,
    prenom: String,
    date: String,
    niveau: String,
    adress: String

});

var eleve = mongoose.model('eleve', eleveSchema);

module.exports = eleve;