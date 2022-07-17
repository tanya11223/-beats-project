(function() {
  window.onload = function() {

    //Video 
    const video = document.getElementById("yt-player");

    //Buttons
    const playButton = document.getElementById("play-pause");
    const muteButton = document.getElementById("mute");

    //Sliders
    const seekBar = document.getElementById("seek-bar");
    const volumeBar = document.getElementById("volume-bar");

    const rangeInputs = document.querySelectorAll('input[type="range"]');

    // Event listener for the play/pause button 
    playButton.addEventListener("click", function() {
      if (video.paused == true) {
        //Play the video 
        video.play();

        playButton.classList.add("paused");
      } else {
        //Paused the video 
        video.pause();

        playButton.classList.remove("paused");
      }
    });

    //Event listener for the mute button 
    muteButton.addEventListener("click", function() {
      if (video.muted == false) {
        //mute the video
        video.muted = true;
      } else {
        // Unmute the video
        video.muted = false;
      }
    });

    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
      //Calculate the new time
      const time = video.duration * (seekBar.value / 100);

      //Update the video time
      video.currentTime = time;
    });

      // Update the seek bar as the video plays
      video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        const value = (100 / video.duration) * video.currentTime;

         // Update the slider value
         seekBar.value = value;
      });

     // Pause the video when the slider handle is being dragged
     seekBar.addEventListener("mousedown", function() {
      video.pause();
  });
    
    // Play the video when the slider handle is dropped
    seekBar.addEventListener("mouseup", function() {
      video.play();
  });

   // Event listener for the volume bar
   volumeBar.addEventListener("change", function() {
     //update the video volume
     video.volume = volumeBar.value;
    
   });
  }
});