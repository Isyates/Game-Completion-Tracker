const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameListSchema = new Schema({
    title:{type:String, required:true},
    genre:{type:String,required:true},
    completed:{type:String, required:true}
})


const Game = mongoose.model('Game', gameListSchema)
module.exports = Game