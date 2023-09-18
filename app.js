const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('./app/helpers/logger');

const app = express();

const allowedOrigins = ['http://localhost:3000'];

// Middleware CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
app.options("/*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const router = require('./app/routes');

const { notFound, errorStack} = require('./app/middlewares/handle-error');

const port = process.env.PORT || '3000';
const host = process.env.HOST || 'localhost';

app.listen(port);
logger('info', 'Server', `Server is listening on: http://${host}:${port}`);



app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to api fish'
  })
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);
  
app.use(errorStack);
app.use(notFound);

