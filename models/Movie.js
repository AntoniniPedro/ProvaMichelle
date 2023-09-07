const { Double } = require('mongodb')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie',{
    nome: String,
    salario: Number,
    aprovado: Boolean,
    titulo: String,
    sinopse: String,
    duracao: Number,
    dataLancamento: String,
    imagem: String,
    categoria: String,
})
module.exports = Movie