const express = require('express');
const app     = express();
const hbs     = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bball-player-profile');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:true}));

const playerSchema = new Schema ({
    name:String,
    age:String,
    height:String,
    weight:String,
    exp:String,
});
const Player = mongoose.model('player', playerSchema)


app.get('/players', (req,res,next) => {
    Player.find()
    .then((listOfPlayers) => {
        res.render('players', {playersArray: listOfPlayers});
    })
    .catch((err) => {
        res.send(err);
    })
})

app.get('/players/:id', (req,res,next) => {
    const theID = req.params.id;

    Player.findById(theID)
    .then((thePlayer) => {
        res.render('playerProfile', {player: thePlayer});
    })
    .catch((err) => {
        res.send(err);
    })
});


app.get('/',(req,res,next) => {
    res.render('index');
});


app.post('/player', (req,res,next) => {
    res.send(req.body)
})




app.listen(3000, () => console.log('Example app listening on port 3000!'))



