const express = require('express');  //import the express package 
const app = express(); // create an express app 
const http = require('http'); // import the Node server package
const server = http.createServer(app); // use our app file with the server

 
const port = process.env.PORT || 3000; //.env.PORT is the environment varibale Node

app.use(express.static('public'));

app.use('/ums', require('./routes/api'));


// this is a route handler -> listen for incoming requests and send back a response
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// set up the server to listen for incoming connection at this port
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
