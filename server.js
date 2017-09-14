'use strict';

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let led = null;
let button = null;
let potentiometer = null;
let board = new five.Board();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/server/index.html')
});

board.Board().on('ready', function() {
    console.log('Server is ready.');

    button = new five.Button(2)

    // Listen to the web socket connection
    potentiometer = new five.Sensor({
        pin: "A2",
        freq: 250
    });

    // Inject the `sensor` hardware into the Repl instance's context allows direct command line access
    board.repl.inject({
        pot: potentiometer
    });

    // "data" get the current reading from the potentiometer
    potentiometer.on("data", function() {
        console.log(this.value);
    });

    button.on("press", function() {
        console.log( "Button pressed" );
    });

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