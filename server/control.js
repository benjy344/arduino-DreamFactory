// client.js

(function() {
    window.socket = io.connect(window.location.hostname + ':' + 3000);
    //LED
    //    var red = document.getElementById('toggleBox');
    //    function emitValue(color, e) {
    //        socket.emit('toggle', {
    //            value: e.target.value
    //        });
    //    }
    //    red.addEventListener('change', emitValue.bind(null, 'toggle'));
    //     socket.on('toggle', function(data) {
    //        document.getElementById('toggleBox').value = data.value;
    //    });

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    socket.on('press', function() {
        console.log('press');
    })

}());