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
	if (data.args[1] == 'reload'){			 
			location.reload(true); 
		}
	if (data.args[1] == 'yourHash'){			 
			myInfo.hash = data.args[2]; 
		}
	
	if (data.args[1] == 'up' || data.args[1] == 'down'){		 
			changeVideo(data.args[1], data.args[2]);
  	}
}

function iAm(who) {
	var character = document.getElementById("character_selector");
	character.style.display = "none";
	myInfo.character = who;

	if(who == 'mom') {
		initVideo();
	}
	if(who == 'dad') {

	}
	//	openFullscreen();

	console.log("character set: " + myInfo.character);

	sendMyInfoToServer();
}		

function setMyHash(data) {
	myInfo.hash = data;
	console.log("hash set: " + myInfo.hash);
	socket.emit('characterIs', myInfo.character, myInfo.hash);
}

function sendMyInfoToServer() {
	console.log("send character: " + myInfo.character + " hash: " + myInfo.hash);
}


function initVideo() {
	videoContainerUp = document.getElementById("vidUp_1");
	videoContainerDown = document.getElementById("vidDown_1");

	videoContainerUp.style.display = "block";
	videoContainerDown.style.display = "block";

	videoContainerUp.play();
	videoContainerDown.play();

}

function changeVideo(upDown, videoName) { // implement nextVideo
	
	var newVideo = 'video/'+videoName+'.mp4';

	if(upDown == 'up') {
		if(prevVideo.up = 1) {
			prevVideo.up = 2;

			var videoContainer = document.getElementById("vidUp_2");
			var videoContainer2 = document.getElementById("vidUp_2");

			videoContainer.style.display = "block";
			videoContainer.src = newVideo;
			videoContainer.play();

			// pause and hide other videoContainer
			videoContainer2 = document.getElementById("vidUp_1");
			videoContainer2.pause();
			videoContainer2.style.display = "none";
		}

		if(prevVideo.up = 2) {
			prevVideo.up = 1;
			
			var videoContainer = document.getElementById("vidUp_1");
			var videoContainer2 = document.getElementById("vidUp_2");

			videoContainer.style.display = "block";
			videoContainer.src = newVideo;
			videoContainer.play();

			// pause and hide other videoContainer
			videoContainer2.pause();
			videoContainer2.style.display = "none";
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

