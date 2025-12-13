const pauseBtn = document.querySelector(".pause-btn");

const playerMenu = {
  pause: false,
};

pauseBtn.addEventListener("click", () => {
  const icon = document.querySelector(".pause-btn img");

  if (playerMenu.pause == true) {
    icon.src = "assets/icons/pause.png";
    playerMenu.pause = false;
  } else if (playerMenu.pause == false) {
    icon.src = "assets/icons/play.png";
    playerMenu.pause = true;
  }

});
