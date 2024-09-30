const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

import songs from "./songs.js";

const textButtonPlay = `<i style="font-size: 4rem;" class='bx bx-play-circle'></i>`;
const textButtonPause = `<i style="font-size: 4rem;" class='bx bx-pause-circle'></i>`;

let index = 0;

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();

const playPause = () => {
  if (player.paused) {
    player.play();
    playPauseButton.innerHTML = textButtonPause;
  } else {
    player.pause();
    playPauseButton.innerHTML = textButtonPlay;
  }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};

// Função para mudar o background
function mudarBackground() {
  const backgrounds = [
    "./src/gifs/l0K4m0wmomideG9e8.gif",
    "./src/gifs/dsd7XbYg0e6hG0A7i8.gif",
    "./src/gifs/music-anime-anime.gif",
    "./src/gifs/810fd7f0fea4ecd8c53dd99ca2c2b47d4ed85a.gif",
    "./src/gifs/9Wgp.gif",
    "./src/gifs/2seKKLp1n0sEeJLYTK.gif",
    "./src/gifs/mJhkYA1gnvY7r481qL.gif",
    "./src/gifs/7bEpr3NIPNY0E.gif",
    "./src/gifs/26tn33aiTi1jkl6H6.gif",
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;   

}

const prevNextMusic = (type = "next") => {
  if ((type == "next" && index + 1 === songs.length) || type === "init") {
    index = 0;
  } else if (type == "prev" && index === 0) {
    index = songs.length;
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }

  mudarBackground(); // Adiciona a chamada para mudar o background

  player.src = songs[index].src;
  musicName.innerHTML = songs[index].name;
  if (type !== "init") playPause();

  updateTime();
};

prevNextMusic("init");

// Reprodução automática ao terminar a faixa
player.onended = () => {
  prevNextMusic("next"); 
};