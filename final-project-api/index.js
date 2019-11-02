const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./database/index')
const port = 8888

app.use(bodyParser.json())
app.use(cors())

app.get(`/`, (req, res) => {
    res.send(`<h1> Final Project-ku </h1>`)
})

app.listen(port, console.log(`Listening to our favourite song.... (${port})`))