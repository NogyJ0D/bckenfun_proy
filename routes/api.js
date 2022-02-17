const express = require('express')
const path = require('path')
const BookController = require('../controllers/book')
const MateriaController = require('../controllers/materia')
const TableController = require('../controllers/table')

const views = file => {
  return path.join(__dirname, '../views', file)
}

const api = app => {
  const router = express.Router()
  const tableServices = new TableController()
  const bookServices = new BookController()
  const materiaServices = new MateriaController()
  app.use('/api', router)
  
  router.get('/readall/:table', async (req, res) => {
    const { table } = req.params
    const all = await tableServices.readByTable(table)
    all.success
      ? res.json({ all: all.response })
      : res.json({ success: false, all })
  })

  router.get('/read/books/:id', async (req, res) => {
    const { id } = req.params
    const books = await bookServices.readById(id)
    books.success
      ? res.json({ books: books.response })
      : res.json({ success: false, books })
  })

  router.post('/book', async (req, res) => {
    const data = req.body
    const book = await bookServices.create(data)
    res.redirect('/')
  })

  router.post('/materia', async (req, res) => {
    const data = req.body
    const materia = await materiaServices.create(data)
    res.redirect('/')
  })

  router.delete('/book/:id', async (req, res) => {
    const { id } = req.params
    const response = await bookServices.delete(id)
    return res.redirect('/')
  })
}

module.exports = api