const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

let db = mongoose.connection;

module.exports = db;