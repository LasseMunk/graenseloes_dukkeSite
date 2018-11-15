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