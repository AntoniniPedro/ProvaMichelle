/* index.js */
const express = require('express')
const mongoose = require('mongoose')
const Movie = require('./models/Movie')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.post('/movie', async (req, res) => {
    const { titulo, sinopse, duracao, dataLancamento, imagem, categoria } = req.body
    const movie = {
      titulo,
      sinopse,
      duracao,
      dataLancamento,
      imagem,
      categoria,
    }
    try {
      await Movie.create(movie)
      res.status(201).json({ message: 'Filme inserido no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

app.get('/movie', async (req, res) => {
    try {
        const movie = await Movie.find()
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/movie/:id', async (req, res) => {
    const id = req.params.id
    try {
        const movie = await Movie.findOne({ _id: id })
        if (!movie) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.patch('/movie/:id', async (req, res) => {
    const id = req.params.id
    const { nome, salario, aprovado } = req.body
    const movie = {
        nome,
        salario,
        aprovado,
    }
    try {
        const updatedMovie = await Movie.updateOne({ _id: id }, movie)
        if (updatedMovie.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.delete('/movie/:id', async (req, res) => {
    const id = req.params.id
    const movie = await Movie.findOne({ _id: id })
    if (!movie) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
    }
    try {
        await Movie.deleteOne({ _id: id })
        res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
  }) 
app.get("/", (req, res) => {  //criando a rota - endpoint
    res.json({ message: "Oi Express!" });
  });
  mongoose.connect(
    'mongodb+srv://pedrogomes:Abiu53mt_@aulatarley.vbcof.mongodb.net/Exemplo?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
