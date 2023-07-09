const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_sea',
});

connection.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = connection;