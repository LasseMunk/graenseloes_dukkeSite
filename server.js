// Daniel Shiffman on express and node.js 
// https://www.youtube.com/watch?v=2hhEOGXcCvg
// https://www.youtube.com/watch?v=HZWmrt3Jy10

var express = require('express'); 			// import express
var app = express();						// express is a function call which create an
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){				// begins a server which listens on port 3000
  console.log('listening on *:3000');
});

app.use(express.static('public')); 	// serve the static files found in the 'public' folder

// javascript is eventbased. Examples of events of the io socket is 
// when a connection is established to a client, a message is received / sent, disconnection.


var clientIds = []; // array which takes care of connected IDs

var characterHashes = {
    mom: 'hash_placeholder',
    dad: 'hash_placeholder'
};

/* ---------------------------------------------
	generate client side files from src folder
   -------------------------------------------- */ 
io.on('connection', function(client){
    clientConnect(client); // call function when client is connecting

client.on('event', function(data){
    // add event logic
});

client.on('disconnect', function(){
    clientDisconnect(client); // call function when client is disconnecting
    });
client.on('characterIs', function(data) { 
    // receiving 'i am this character' from client
    
        if(data.character == 'mom') {
            characterHashes.mom = data.hash;
        };
        if(data.character == 'dad') {
            characterHashes.dad = data.hash;
        };
    });
});

function clientConnect(socket) {

	// there exist a socket, when a new connection is made. Therefore the argument
	// is the socket.

	// There has to be code in the client which tells the client to connect
	// to the server (and triggers the new connection event). 
			
			// Add a reference to the socket.io library in the index.html
			// Write the socket.io code in the UI (or what-ever js). 

    clientIds.push(socket.id);
    console.log ("connected, clients array: " + clientIds);

    io.sockets.connected[socket.id].emit('yourHash', socket.id);  
}

function clientDisconnect (socket) {
    
    var i = clientIds.indexOf(socket);
    clientIds.splice(i, 1); // delete socket.id from clientIds array
    
    console.log ("disconnected, clients array: " + clientIds);
    
}

/****************
 * OSC Over UDP *
 ****************/

// When sending OSC, use /your-osc-message to avoid errors

var osc = require("osc");

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }
    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    // socket server ip
    localAddress: "127.0.0.1",
    localPort: 57121,

    // MAX ip and port
    remoteAddress: "127.0.0.1",
    remotePort: 57120
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);

    /* 
        /whichCharacter upOrDown play preLoadNextVideo
    */

    if (oscMessage.address == '/all') {
        
        io.sockets.emit("message", oscMessage);   // send to all
    };

    if(oscMessage.address == '/mom') {
        console.log(characterHashes.mom);
        io.sockets.connected[characterHashes.mom].emit('message', oscMessage);  
    }
    if(oscMessage.address == '/dad') {
        io.sockets.connected[characterHashes.dad].emit('message', oscMessage);  
    }
    
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

/****************
 * OSC THE END  *
 ****************/