const { query, insert, del } = require('../database')

class MateriaController {

  async create (materia) {
    const response = await insert('materias', materia)
    if (response) return { success: true, response: response.data }
    else return { success: false, response }
  }

}

module.exports = MateriaController