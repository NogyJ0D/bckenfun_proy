const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '7895',
  database: 'Progreader'
})

const query = (sql, data) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, result) => {
      err
        ? reject(err.sqlMessage)
        : resolve(result)
    })
  })
}

const insert = async (table, data) => {
  console.log(data)
  try {
    await query(`INSERT INTO ${table}(??) VALUES(?)`, [
      Object.keys(data),
      Object.values(data)
    ])
    return { success: true, data }
  } catch (err) {
    return {success: false, err }
  }
}

const del = async (table, id) => {
  try {
    await query(`DELETE FROM ${table} WHERE id = ?`, [id])
    return { success: true, id }
  } catch (err) {
    return {success: false, err }
  }
}

module.exports = { query, insert, del }