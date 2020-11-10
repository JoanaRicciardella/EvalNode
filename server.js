//declarations des constantes :
const express = require('express'); //pour definir les routes
const uri = "mongodb+srv://admin:admin@cluster0.c3vm4.mongodb.net/Cluster0?retryWrites=true&w=majority";//connexion MongoDB
const mongoose= require('mongoose');
const bodyParser = require('body-parser'); //pour convertir la chaine de caractere
const ecole = require('./model/modelecole');
const prof = require('./model/modelprof');
const eleve = require('./model/modeleleve');



//Demarrage du server :
var app = express();

var promise = mongoose.connect(uri, {useNewUrlParser: true});
//écouter les evenemenst qui ce passe sur le server 3000
promise.then((db) =>{
    console.log('DB connected');
    app.listen(3000, () =>{

        //A l'ouverture du serveur je mets ce message d'accueil
        console.log('Listening on port 3000!');
    });
});

console.log("test");


//Configuration :
app.use('/pages', express.static('./client/pages'));
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//Les routes :
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/client/index.html');//pour charger la page html
});

app.post('/ecole', (req, res) =>{
    var newecole = new ecole(req.body);
    console.log(newecole);
    newecole.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});


app.post('/eleve', (req, res) =>{
    var neweleve = new eleve(req.body);
    console.log(neweleve);
    neweleve.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});


app.post('/prof', (req, res) =>{
    var newprof = new prof (req.body);
    console.log(newprof);
    newprof.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});




app.get('/ecole', (req, res) =>{

    ecole.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});

app.get('/eleve', (req, res) =>{

    eleve.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});

app.get('/prof', (req, res) =>{

    prof.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});




app.get('/ecole/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    ecole.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
    
        return res.send(obj);
        })
    });

app.get('/eleve/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    eleve.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
        
        return res.send(obj);
        })
    });


app.get('/prof/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    prof.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
            
        return res.send(obj);
        })
    });




app.put('/ecole/:id', (req, res) =>{
    ecole.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
     if(err){
        console.log(err);
        return res.send(500);
            }
        res.send(obj);
        });        
    });


app.put('/eleve/:id', (req, res) =>{
    eleve.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
     if(err){
        console.log(err);
        return res.send(500);
                }
        res.send(obj);
        });        
    });

app.put('/prof/:id', (req, res) =>{
    prof.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
     if(err){
        console.log(err);
        return res.send(500);
                    }
        res.send(obj);
        });        
    });


app.delete('/ecole/:id', (req, res) =>{
    ecole.deleteOne({_id: req.params.id}, (err, obj) =>{
        if(err) {
            console.log(err);
            res.send(500);
        }
        res.sendStatus(200);
    });
    });


app.delete('/eleve/:id', (req, res) =>{
    eleve.deleteOne({_id: req.params.id}, (err, obj) =>{
        if(err) {
            console.log(err);
            res.send(500);
        }
        res.sendStatus(200);
    });
    });



app.delete('/prof/:id', (req, res) =>{
    prof.deleteOne({_id: req.params.id}, (err, obj) =>{
        if(err) {
            console.log(err);
            res.send(500);
        }
        res.sendStatus(200);
    });
    });
           
           
            
