const express = require('express')
const path = require('path')

const views = file => {
  return path.join(__dirname, 'views', file)
}

// Routes
const apiRoutes = require('./routes/api')

const app = express()

// Middlewares
app.use(express.static(__dirname + '/static'))
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

apiRoutes(app)

// Start
app.get('/', (req, res) => {
  res.sendFile(views('index.html'))
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('Funcionando en el puerto: ' + port)
})