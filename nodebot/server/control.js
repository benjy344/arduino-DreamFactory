// client.js

(function() {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    var red = document.getElementById('toggleBox');

    function emitValue(color, e) {
        socket.emit('toggle', {
            value: e.target.value
        });
    }

    red.addEventListener('change', emitValue.bind(null, 'toggle'));
   
    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    socket.on('toggle', function(data) {
        document.getElementById('toggleBox').value = data.value;
    });
}());