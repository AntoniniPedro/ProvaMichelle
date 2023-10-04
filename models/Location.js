const { Double } = require('mongodb')
const mongoose = require('mongoose')
const Location = mongoose.model('Location',{
    name: String,
    position: [Number],
})
module.exports = Location