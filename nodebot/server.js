'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let led = null;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/server/index.html')
});

five.Board().on('ready', function() {
    console.log('Server is ready.');

    // Map pins to digital inputs on the board
    led = new five.Led(13)
    

    // Listen to the web socket connection
    io.on('connection', function(client) {
        client.on('join', function(handshake) {
            console.log(handshake);
        });

        // Every time a 'rgb' event is sent, listen to it and grab its new values for each individual colour
        client.on('toggle', function(data) {
            led.toggle();

            client.emit('toggle', data);
            client.broadcast.emit('toggle', data);
        });
    });
});

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);