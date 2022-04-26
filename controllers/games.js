const express = require('express')
const gameRoute = express.Router()
const Game = require('../models/gameList')
const seededData = require('../models/gameListSeeder')

gameRoute.get('/seed', (req,res)=>{
    Game.deleteMany({}, (err, clearedGames) => {
        Game.create(seededData, (err,data)=> {
            res.redirect('/gameserver')
        })
    })
})



gameRoute.get('/', (req,res) => {
Game.find({},(err,allGames) => {
    res.render('index.ejs', {games:allGames})
})
})

gameRoute.get('/:id', (req,res)=> {
    Game.findById(req.params.id, (err,allGames) => {
        res.render('show.ejs', {game:allGames})
    })
})


module.exports = gameRoute