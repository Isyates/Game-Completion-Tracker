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

gameRoute.get('/new', (req,res) =>{
    res.render('new.ejs')
})

gameRoute.get('/', (req,res) =>  Game.find({},(err,allGames) => {
    res.render('index.ejs', {games:allGames})
})
)


 gameRoute.get('/:id', async(req,res)=> {
    Game.findById(req.params.id, (err,allGames) => {
        res.render('show.ejs', {game:allGames})
    })
})

gameRoute.post('/', (req,res) => {
    Game.create(req.body, (err,newGame) => {
        if(err) return res.send(err)
        res.redirect('/gameserver')
    })
})
gameRoute.get('/:id/edit', (req,res)=> {
    Game.findById(req.params.id, (err,game) => {
        res.render('edit.ejs', {game})
    })
})

gameRoute.put('/:id', (req,res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, (err,updatedGame) => {
        res.redirect(`/gameserver/${req.params.id}`)
    })
})

gameRoute.delete('/:id', (req,res)=> {
    Game.findByIdAndDelete(req.params.id, (err,deletedGame)=> {
        res.redirect('/gameserver')
    })
})
module.exports = gameRoute