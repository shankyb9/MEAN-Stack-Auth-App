const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require("cors");
const config = require('./config/database');

mongoose.Promise = global.Promise

mongoose.connect(config.database);

// on Successful Connection
mongoose.connection.on('connected',()=>{
  console.log('Connected to database: '+config.database);
});

// on Connection error
mongoose.connection.on('error',(err)=>{
  console.log('Database error: '+err);
});

// Init app
const app = express();

const users = require('./routes/users');

// CORS Middleware
app.use(cors());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

// Home Route
app.get('/',(req,res) => {

  res.send("Done");

});


app.listen('3000',() => {
  console.log('Listening to port 3000');
});
