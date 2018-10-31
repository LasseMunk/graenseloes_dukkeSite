var socket = io();	
    socket.on('message', oscMessage);
     	
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
		

	console.log(src);	
	var img = document.createElement("img");
	img.src = src;
	img.width = width;
	img.height = height;
	img.alt = alt;
	img.id = 'face';
	document.body.appendChild(img);
}


