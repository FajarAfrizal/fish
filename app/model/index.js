'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const config = require('../config/index'); 
const db = {};

// Koneksi ke MongoDB
mongoose.connect(config.urlDb, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

// Tambahkan kode untuk menghubungkan model-model dengan skema MongoDB di sini
// Misalnya, jika Anda memiliki model User, Anda dapat menghubungkannya seperti ini:
// const User = require('./user.model');
// db.User = User;

module.exports = db;
