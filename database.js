const mysql = require('mysql2')

// Conexion a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login-electron'
  });

  function getConnection() {
      return connection
  }


  module.exports = {getConnection}