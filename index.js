/* index.js */
const express = require('express')
const mongoose = require('mongoose')
const Location = require('./models/Location')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.post('/newlocation', async (req, res) => {
    const { name, position } = req.body
    const location = {
      name,
      position,
    }
    try {
      await Location.create(location)
      res.status(201).json({ message: 'Localização inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

app.get('/location', async (req, res) => {
    try {
        const location = await Location.find()
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/location/:id', async (req, res) => {
    const id = req.params.id
    try {
        const location = await Location.findOne({ _id: id })
        if (!location) {
            res.status(422).json({ message: 'Localização não encontrada!' })
            return
        }
        res.status(200).json(location)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.patch('/updatelocation/:id', async (req, res) => {
    const id = req.params.id
    const { name, position } = req.body
    const location = {
        name,
        position,
    }
    try {
        const updatedLocation = await Location.updateOne({ _id: id }, location)
        if (updatedLocation.matchedCount === 0) {
            res.status(422).json({ message: 'Localização não encontrado!' })
            return
        }
        res.status(200).json(updatedLocation)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.delete('/Location/:id', async (req, res) => {
    const id = req.params.id
    const location = await Location.findOne({ _id: id })
    if (!location) {
        res.status(422).json({ message: 'Localização não encontrado!' })
        return
    }
    try {
        await Location.deleteOne({ _id: id })
        res.status(200).json({ message: 'Localização removido com sucesso!' })
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
