const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const gameListController = require('./controllers/games')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3001
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

//middleware
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'));

app.use('/gameserver', gameListController)


app.get('/', (req, res) => {
    res.redirect('/gameserver');
});
const db = mongoose.connection

db.on('error', (err) => console.log(err.message + "is mongo not running?"))
db.on('connected', () => console.log(" mongoose is connected"))
db.on('disconnected', () => console.log("mongo disconnected"))


app.listen(PORT,() => console.log(`running on port ${PORT}`))