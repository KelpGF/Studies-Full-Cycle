const mysql = require('mysql');

const mysqlDbConfig = {
  database: process.env.DB_MYSQL_DBNAME,
  host: process.env.DB_MYSQL_HOST,
  port: process.env.DB_MYSQL_PORT,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASS,
}

/** @type { mysql.Connection } */
let connection = mysql.createConnection(mysqlDbConfig)

connection.connect(async (error) => {
  if (error) return console.error(error)

  const query = "CREATE TABLE IF NOT EXISTS people (name VARCHAR(255))";
  connection.query(query)
})

function getConnection() {
  if (!connection) connection = mysql.createConnection(mysqlDbConfig)

  return connection
}

async function executeQuery(query) {
  return await new Promise((resolve, reject) => {
    getConnection().query(query, (error, results) => {
      if (error) reject(error)
      else resolve(results)
    })
  })
}

module.exports = {
  executeQuery
}