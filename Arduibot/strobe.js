var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
  // Create an Led on pin 13
  var led = new five.Led(13);

  // Strobe the pin on/off, defaults to 100ms phases
	led.fade({
	  easing: "outSine",
	  duration: 1000,
	  cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
	  keyFrames: [0, 250, 25, 150, 100, 125],
	  onstop: function() {
	    console.log("Animation stopped");
	  }
  });
  });