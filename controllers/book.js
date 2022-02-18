const { query, insert, del, update } = require('../database')

class BookController {
  async create (book) {
    const response = await insert('libros', book)
    if (response) return { success: true, response: response.data }
    else return { success: false, response }
  }

  async readByMateria (id) {
    id = id.slice(1)
    const response = await query(`SELECT * FROM libros WHERE materia_id = ${id} ORDER BY titulo`)
    if (response) return { success: true, response }
    else return { success: false, response }
  }

  async readByBook (id) {
    const response = await query(`SELECT * FROM libros WHERE id = ${id}`)
    if (response) return { success: true, response }
    else return { success: false, response }
  }

  async delete (id) {
    const response = await del("libros", id)
    response.success
      ? { success: true, message: 'Eliminado con éxito.' }
      : { success: false, response }
  }

  async update (data, id) {
    const response = await update("libros", data, id)
    response.success
      ? { success: true, message: 'Editado con éxito.' }
      : { success: false, response }
  }
}

module.exports = BookController