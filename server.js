'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let led = null;
let button = null;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/server/index.html')
});

five.Board().on('ready', function() {
    console.log('Server is ready.');

    button = new five.Button(2)

    // Listen to the web socket connection
    io.on('connection', function(client) {
        client.on('join', function(handshake) {
            console.log(handshake);
        });

        button.on("press", function() {
            console.log( "Button pressed" );
            client.emit('press');
            client.broadcast.emit('press');
        });

    });
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);