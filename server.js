const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Funcionando')
})

const port = process.env.PORT || 4500
app.listen(port, () => {
  console.log('Funcionando en el puerto: ' + port)
})