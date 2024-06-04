require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": process.env.DB_DATABASE || "ElisoftAPI",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "ElisoftAPI",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}