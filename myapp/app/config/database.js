var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password :process.envDB_PASSWORD,
  database :process.env.DB_DATABASE
});
db.connect();
 module.exports=db;

