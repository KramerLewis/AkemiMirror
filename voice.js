if (annyang) {
  // Let's define a command.
  var commands = {
    'go home': function() { loadHome(WEATHER_KEY); },

    'load youtube': function() {
    	if(loaded) {
    		reloadYoutube();
    	} else {
    		loadYoutube();
    	}
    },

    'play video': function() { playVid(); },
    'pause video': function() { pauseVid(); },
    'next video': function() { nextVid(); },
    'previous video': function() { prevVid(); }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}