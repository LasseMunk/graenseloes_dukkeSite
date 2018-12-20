var socket = io();	
		socket.on('message', oscMessage);
		socket.on('yourHash', setMyHash);

// Objects
var prevVideo = {
	up: 1,
	down: 1
}		

var myInfo = {
	hash: 'hash_placeHolder',
	character: 'character_placeHolder'
}

var activeVideoContainer = {
	up: 'container_placeholder',
	down: 'container_placeholder'
}

var momNames_up = [
	"Mor_alm1_up",
	"Mor_bange_up",
	"Mor_kigger_starut_up",
	"Mor_lytter_hus_up",
	"Mor_ny_verden_up",
	"Mor_snakker_up",
	"Mor_utilfreds_up"
];

var momNames_down = [
	"Mor_alm1_down",
	"Mor_bange_down",
	"Mor_kigger_starut_down",
	"Mor_lytter_hus_down",
	"Mor_ny_verden_down",
	"Mor_snakker_down",
	"Mor_utilfreds_down"
];


var dadNames_up = [
	"Far_alm_up",
	"Far_kigger_starut_up",
	"Far_lytter_up",
	"Far_nye_verden_up",
	"Far_skeptisk_up",
	"Far_snakker_up"
];

var dadNames_down = [
	"Far_alm_down",
	"Far_lytter_down",
	"Far_nye_verden_down",
	"Far_skeptisk_down",
	"Far_snakker_down"
	];

function oscMessage(data) {	 
	
	if (data.args[0] == 'reload'){			 
		location.reload(true); 
	}
	if (data.args[0] == 'initialize'){			 
		initVideo(myInfo.character); 
	}
	if (data.args[0] == 'ping'){			 
		// returnPing();
	}
	if (data.args[0] == 'show'){			 
		showHide('show');
	}
	if (data.args[0] == 'hide'){			 
		showHide('hide');
	}
	if (data.args[0] == 'up' || data.args[0] == 'down'){		 
			changeVideo(data.args[0], data.args[1]);
  	}
}

function iAm(who) {
	requestScreenFull();
	var character = document.getElementById("character_selector");
	character.style.display = "none";

	var waiting = document.getElementById('waiting_for_OSC');
	waiting.style.display = 'block';


	myInfo.character = who;

	console.log("character set: " + myInfo.character);

	sendMyInfoToServer();
}		

function setMyHash(data) {
	myInfo.hash = data;
	console.log("hash set: " + myInfo.hash);
}

function sendMyInfoToServer() {
	console.log("send character: " + myInfo.character + " hash: " + myInfo.hash);
	socket.emit('characterIs', myInfo);
}

function initVideo(character) {
	var waiting = document.getElementById('waiting_for_OSC');
	waiting.style.display = 'none';

	if(character == 'mom') {
		// generate video containers UP
		for(var i = 0; i < momNames_up.length; i++){
			var vid = document.createElement("video");
			vid.id = momNames_up[i];
			vid.src = 'video/mom/'+momNames_up[i]+'.mp4';
			vid.muted = true;
			vid.autoplay = false;
			vid.preload = 'auto';
			vid.loop = true;
			vid.autoplay = false;
			vid.style.display = 'none';
			vid.width = 534;
			vid.height = 425;
			document.getElementById("vid_up").appendChild(vid);
		}

		for(var i = 0; i < momNames_down.length; i++){
			var vid = document.createElement("video");
			vid.id = momNames_down[i];
			vid.src = 'video/mom/'+momNames_down[i]+'.mp4';
			vid.muted = true;
			vid.autoplay = false;
			vid.preload = 'auto';
			vid.loop = true;
			vid.autoplay = false;
			vid.style.display = 'none';
			vid.width = 534;
			vid.height = 425;
			document.getElementById("vid_down").appendChild(vid);
		}
	}

	if(character == 'dad') {
		// generate video containers UP
		for(var i = 0; i < dadNames_up.length; i++){
			
			var vid = document.createElement("video");
			vid.id = dadNames_up[i];
			vid.src = 'video/dad/'+dadNames_up[i]+'.mp4';
			vid.muted = true;
			vid.autoplay = false;
			vid.preload = 'auto';
			vid.loop = true;
			vid.autoplay = false;
			vid.style.display = 'none';
			vid.width = 534;
			vid.height = 425;
			document.getElementById("vid_up").appendChild(vid);
		}

		for(var i = 0; i < dadNames_down.length; i++){
			
			var vid = document.createElement("video");
			vid.id = dadNames_down[i];
			vid.src = 'video/dad/'+dadNames_down[i]+'.mp4';
			vid.muted = true;
			vid.autoplay = false;
			vid.preload = 'auto';
			vid.loop = true;
			vid.autoplay = false;
			vid.style.display = 'none';
			vid.width = 534;
			vid.height = 425;
			document.getElementById("vid_down").appendChild(vid);
		}
	}
}

function returnPing() {
	socket.emit('ping', myInfo);
}

function setVidUpDownPositionAbsolute() {
	var up = document.getElementById('vid_up');
	var down = document.getElementById('vid_down');

	up.style.position = 'relative';
	up.style.x = 200;
	up.style.y = 0;

	down.style.position = 'absolute';
	down.style.x = 0;
	down.style.y = 850;
}

function requestScreenFull() {
	if (screenfull.enabled) {
		screenfull.request();
	}
}

function disableScreenFull() {
	if (screenfull.enabled) {
		screenfull.exit();
	}
}

function showHide(state) {
	if(state == 'hide') {
		activeVideoContainer.up.style.display = 'none'; 
		activeVideoContainer.down.style.display = 'none'; 
	}
	if(state == 'show') {
		activeVideoContainer.up.style.display = 'block'; 
		activeVideoContainer.down.style.display = 'block'; 
	}
}

function snapchatOverlay(character) {
	// how the hell ?
}

function changeVideo(upDown, videoName) {
	
	if(upDown == 'up') {	
			playVideo = document.getElementById(videoName); 
			playVideo.style.display = 'block'; 
			playVideo.play();

			if(	activeVideoContainer.up != "container_placeholder" &&
				activeVideoContainer.up != playVideo) 
				{
				activeVideoContainer.up.style.display = 'none'; 
				activeVideoContainer.up.pause();
			}

			activeVideoContainer.up = playVideo;
	}
	if(upDown == 'down') {	
			playVideo = document.getElementById(videoName); 
			playVideo.style.display = 'block'; 
			playVideo.play();

			if(	activeVideoContainer.down != "container_placeholder" &&
				activeVideoContainer.down != playVideo) 
				{
				activeVideoContainer.down.style.display = 'none'; 
				activeVideoContainer.down.pause();
			}

			activeVideoContainer.down = playVideo;
	}
}


