const { query, insert, del } = require('../database')

class BookController {
  async create (book) {
    const response = await insert('libros', book)
    if (response) return { success: true, response: response.data }
    else return { success: false, response }
  }

  async readById (id) {
    id = id.slice(1)
    const response = await query(`SELECT * FROM libros WHERE materia_id = ${id} ORDER BY titulo`)
    if (response) return { success: true, response }
    else return { success: false, response }
  }

  async delete (id) {
    const response = await del('libros', id )
    response.success
      ? { success: true, message: 'Eliminado con éxito.' }
      : { success: false, response }
  }
}

module.exports = BookController