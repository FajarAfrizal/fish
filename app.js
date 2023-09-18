const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('./app/helpers/logger');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the allowed origin(s)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods to allow
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'], // Allowed request headers
};
app.use(cors( corsOptions ));

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

