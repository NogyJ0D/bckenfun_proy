const { query, insert, del } = require('../database')

class TableController {

  async readByTable (table) {
    const response = await query(`SELECT * FROM ${table}`)
      if (response) return { success: true, response }
      else return { success: false, response }
  }

}

module.exports = TableController