// Setup empty JS object to act as endpoint for all routes
projectData = {};
let data = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, ()=>{
  console.log(`The server is running on port: ${port}`);
})

// GET route that returns the projectData object
app.get('/getData', (req, res) => {
  console.log(projectData);
  res.send(projectData);
});

// POST route that adds incoming data to projectData
app.post('/postData', (req, res) => {
  newEntry = {
    date:req.body.date,
    temperature: req.body.temperature,
    weather:req.body.weather,
    userResponse:req.body.userResponse
  }
  console.log(newEntry);
  projectData = newEntry;
  data.push(newEntry);
  console.log(data);
});
