const express = require('express');
const mongoose = require('mongoose');
const userRoute= require('./RotueHandler/userRoute');
const todoRoutes= require('./RotueHandler/todoRoute');
const app = express();
const dotenv = require('dotenv')
app.use(express.json());
dotenv.config();
//mongodb connection

mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(
    function() {console.log('database connected')}
    )
    .catch(err => {console.log('error connecting database')})

    app.use('/user', userRoute)
    app.use('/todo', todoRoutes)

    // default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  
  app.use(errorHandler);
  
app.listen(3000, function() {
    console.log('listening on port 3000');
})