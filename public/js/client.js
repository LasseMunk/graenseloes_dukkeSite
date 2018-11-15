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


function oscMessage(data) {	 
	
	if (data.args[0] == 'reload'){			 
			location.reload(true); 
		}
	if (data.args[0] == 'initialize'){			 
			initVideo(myInfo.character); 
		}
	
	if (data.args[0] == 'up' || data.args[0] == 'down'){		 
			changeVideo(data.args[0], data.args[1]);
  	}
}

function iAm(who) {
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
	videoContainerUp1 = document.getElementById("vidUp_1");
	videoContainerDown1 = document.getElementById("vidDown_1");

	videoContainerUp2 = document.getElementById("vidUp_2");
	videoContainerDown2 = document.getElementById("vidDown_2");

	var waiting = document.getElementById('waiting_for_OSC');
	waiting.style.display = 'none';

	videoContainerUp1.style.display = "block";
	videoContainerDown1.style.display = "block";

	if(character == 'mom') {
		videoContainerUp1.src = 'video/__init_mom_up.mp4';
		videoContainerDown1.src = 'video/__init_mom_down.mp4';

		videoContainerUp2.src = 'video/_lowercomp.mp4';
		videoContainerDown2.src = 'video/_uppercomp.mp4';
	}
	if(character == 'dad') {
		videoContainerUp1.src = 'video/__init_dad_up.mp4';
		videoContainerDown1.src = 'video/__init_dad_down.mp4';

		videoContainerUp2.src = 'video/_lowercomp.mp4';
		videoContainerDown2.src = 'video/_uppercomp.mp4';
	}

	videoContainerUp1.play();
	videoContainerDown1.play();

}

function changeVideo(upDown, videoName) {


	// https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
	
	var newVideo = 'video/'+videoName+'.mp4';

	if(upDown == 'up') {
		if(prevVideo.up = 1) {
			prevVideo.up = 2;

			var videoContainer1 = document.getElementById("vidUp_1");
			var videoContainer2 = document.getElementById("vidUp_2");

			// pause and hide video container 1
			videoContainer2.style.display = "block";
			videoContainer1.style.display = "none";

			videoContainer2.play();
			
			// new source in video container 1
			videoContainer1.src = newVideo;
			// videoContainer1.load();
			// videoContainer1.pause();
		}

		if(prevVideo.up = 2) {
			prevVideo.up = 1;

			var videoContainer1 = document.getElementById("vidUp_1");
			var videoContainer2 = document.getElementById("vidUp_2");

			// pause and hide video container 2
			videoContainer1.style.display = "block";
			videoContainer2.style.display = "none";

			videoContainer1.play();
			
			// new source in video container 1
			videoContainer2.src = newVideo;
			// videoContainer1.load();
			// videoContainer2.pause();
		}
	}
	if(upDown == 'down') {
		if(prevVideo.down = 1) {
			prevVideo.down = 2;

			var videoContainer1 = document.getElementById("vidDown_1");
			var videoContainer2 = document.getElementById("vidDown_2");

			// pause and hide video container 1
			videoContainer2.style.display = "block";
			videoContainer1.style.display = "none";

			videoContainer2.play();
			
			// new source in video container 1
			videoContainer1.src = newVideo;
			videoContainer1.pause();
		}

		if(prevVideo.down = 2) {
			prevVideo.down = 1;

			var videoContainer1 = document.getElementById("vidDown_1");
			var videoContainer2 = document.getElementById("vidDown_2");

			// pause and hide video container 2
			videoContainer1.style.display = "block";
			videoContainer2.style.display = "none";

			videoContainer1.play();
			
			// new source in video container 1
			videoContainer2.src = newVideo;
			videoContainer2.pause();
		}
	}
}

function openFullscreen() {

// https://developers.google.com/web/fundamentals/native-hardware/fullscreen/

	/* Get the element you want displayed in fullscreen 
	mode (a video in this example): */
	var elem = document.getElementById("bdy"); 

	/* When the openFullscreen() function is executed, open the video in fullscreen.
	Note that we must include prefixes for different browsers,
	as they don't support the requestFullscreen method yet */

  if (elem.requestFullscreen) {
    document.body.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    document.body.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    document.body.requestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    document.body.requestFullscreen();
  }
}

