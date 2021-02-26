// const Mysql = require("mysql2");

// require("dotenv").config();

// let connection;

// if (process.env.JAWSDB_URL) {
//   connection = new Mysql(process.env.JAWSDB_URL);
// } else {
//   // create connection to our database, pass in your MySQL information for username and password
//   const connection = new Mysql(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 301
//   });
// }

// connection.connect(function (err) {
//   if (err) throw err;
// });

// module.exports = connection;