var socket = io();	
		socket.on('message', oscMessage);
		
function sendMom() {
 //	openFullscreen();
	show_image('/img/gGif_4_1.gif', 434, 715, 'img1');
}		
		
function sendDad() {
	// openFullscreen();
	show_image('/img/gGif_4_2.gif', 434, 715, 'img2');		 
}			

function oscMessage(data) {	 

	if (data.args[1] == 'reload'){			 
        location.reload(true); 
		}
	
	if (data.args[1] == 'img1'){		 

		show_image('/img/gGif_4_1.gif', 434, 715, 'img1');

  	}
	if (data.args[1] == 'img2'){
		show_image('/img/gGif_4_2.gif', 434, 715, 'img2');		 
	}	
}

function show_image(src, width, height, alt) {
	
	var deleteOld = document.getElementById('face');	
	deleteOld.parentNode.removeChild(deleteOld);
		
	var img = document.createElement("img");
	console.log(src);
	img.src = src;
	img.width = width;
	img.height = height;
	img.alt = alt;
	img.id = 'face';
	document.body.appendChild(img);
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

