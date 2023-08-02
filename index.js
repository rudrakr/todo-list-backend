const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//FOR GETTING THE MONGO CONNECTION
require('./db/conn');


var cors = require('cors')
app.use(cors());


// To separate the routes from the main index.js page
// -------------------------------------------------
const userRoute = require('./routes/UserRoute')
app.use("/user", userRoute)

const todoRoute = require('./routes/TodoRoute');
app.use("/todo", todoRoute);

app.listen(port, function () {
  console.log("Your app is listening on port" + port);
});