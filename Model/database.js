var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_BBDD,
  password: process.env.PSWORD_BBDD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});