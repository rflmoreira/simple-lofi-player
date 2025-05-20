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
  // Se estiver na primeira música, vá para a segunda e toque
  if (index === 0) {
    index = 1;
    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;
    atualizarCapa();
    mudarBackground();
    player.play();
    playPauseButton.innerHTML = textButtonPause;
    updateTime();
    atualizarBotoesAvanco();
    return;
  }

  if (player.paused) {
    // Se for a última música, recarrega o src e reinicia do começo
    if (index === songs.length - 1) {
      player.src = songs[index].src;
      player.currentTime = 0;
    }
    player.play();
    // Se for a última música, mostra o ícone de stop
    if (index === songs.length - 1) {
      playPauseButton.innerHTML = `<i style="font-size: 4rem;" class='bx bx-stop-circle'></i>`;
    } else {
      playPauseButton.innerHTML = textButtonPause;
    }
  } else {
    player.pause();
    playPauseButton.innerHTML = textButtonPlay;
  }
};

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;
  switch (key) {
    case " ": // Espaço para play/pause
      playPause();
      break;
    case "ArrowRight": // Seta para a direita para próxima música
      prevNextMusic();
      break;
    case "ArrowLeft": // Seta para a esquerda para música anterior
      prevNextMusic("prev");
      break;
  }
}

player.ontimeupdate = () => updateTime();

let isBuffering = false;

player.addEventListener('waiting', () => {
  isBuffering = true;
  currentTime.textContent = "Buffering...";
});

player.addEventListener('playing', () => {
  isBuffering = false;
  updateTime();
});

const updateTime = () => {
  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  // Mostra Buffering... se estiver carregando
  if (isBuffering) {
    currentTime.textContent = "Buffering...";
    duration.textContent = "-:--";
  } else if (
    !player.src ||
    isNaN(player.currentTime) ||
    (player.currentTime === 0 && durationFormatted === 0) ||
    index === songs.length - 1
  ) {
    currentTime.textContent = "-:--";
    duration.textContent = "-:--";
  } else {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);
    // O duration.innerHTML já é tratado abaixo para o botão AO VIVO
  }

  if (index === songs.length - 1) {
    duration.innerHTML = `<button id="btn-ao-vivo" style="background:none;border:none;padding:0px;margin:5;font:inherit;color:red;cursor:pointer;display:inline-block;">AO VIVO</button>`;
  } else {
    duration.innerHTML = `<button id="btn-ao-vivo" style="background:none;border:none;padding:0px;margin:5;font:inherit;color:#ffffff86;opacity: 0.5;cursor:pointer;display:inline-block;">AO VIVO</button>`;
  }

  progress.style.width = progressWidth + "%";
};

// Adicione este evento para o botão AO VIVO
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "btn-ao-vivo") {
    e.preventDefault(); // Garante que o clique não seja perdido
    setTimeout(() => {
      if (index === songs.length - 1) {
        // Se já está na última (ao vivo), vai para a segunda música
        index = 1;
      } else {
        // Se não está, vai para a última (ao vivo)
        index = songs.length - 1;
      }
      player.src = songs[index].src;
      musicName.innerHTML = songs[index].name;
      atualizarCapa();
      mudarBackground();
      playPause();
      updateTime();
      atualizarBotoesAvanco();
    }, 10); // Pequeno delay para garantir o clique
  }
});

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};

let bgToggle = false; // Coloque no topo do seu script

function mudarBackground() {
  const backgrounds = [
    "./src/gifs/l0K4m0wmomideG9e8.gif",
    "./src/gifs/dsd7XbYg0e6hG0A7i8.gif",
    "./src/gifs/music-anime-anime.gif",
    "./src/gifs/810fd7f0fea4ecd8c53dd99ca2c2b47d4ed85a.gif",
    "./src/gifs/2seKKLp1n0sEeJLYTK.gif",
    "./src/gifs/mJhkYA1gnvY7r481qL.gif",
    "./src/gifs/7bEpr3NIPNY0E.gif",
    "./src/gifs/26tn33aiTi1jkl6H6.gif",
    "./src/gifs/yA1xRW.gif",
    "./src/gifs/the-simpsons-dancing.gif",
    "./src/gifs/16bit-lo-fi-hip-hop.gif",
  ];

  const bg1 = document.getElementById("bg-fade1");
  const bg2 = document.getElementById("bg-fade2");

  let bgToUse;
  if (index === songs.length - 1) {
    // Sempre usa o gif 16bit-lo-fi-hip-hop.gif para a última música
    bgToUse = "./src/gifs/16bit-lo-fi-hip-hop.gif";
  } else {
    // Escolhe aleatório para as demais
    const randomIndex = Math.floor(Math.random() * (backgrounds.length - 1));
    bgToUse = backgrounds[randomIndex];
  }

  if (bgToggle) {
    bg2.style.backgroundImage = `url(${bgToUse})`;
    bg2.style.opacity = 1;
    bg1.style.opacity = 0;
  } else {
    bg1.style.backgroundImage = `url(${bgToUse})`;
    bg1.style.opacity = 1;
    bg2.style.opacity = 0;
  }
  bgToggle = !bgToggle;
}

const prevNextMusic = (type = "next") => {
  if (type === "next") {
    index = (index + 1) % songs.length; // Vai para a próxima, ou volta para 0 se for a última
  } else if (type === "prev") {
    index = (index - 1 + songs.length) % songs.length; // Vai para a anterior, ou para a última se for a primeira
  } else if (type === "init") {
    index = 0;
  }

  mudarBackground();

  player.src = songs[index].src;
  musicName.innerHTML = songs[index].name;
  atualizarCapa();
  if (type !== "init") playPause();

  updateTime();
  atualizarBotoesAvanco();
};

// Novas variáveis e funções para a capa
const capaImg = document.getElementById("capa-img");

// Caminho da capa padrão e da capa ao vivo
const capaPadrao = "./src/capa.png";
const capaAoVivo = "./src/simple_lofi_on.png"; // coloque a imagem desejada para o ao vivo

function atualizarCapa() {
  capaImg.src = songs[index].cover || capaPadrao;
}

// Sempre que trocar de música, chame:
atualizarCapa();

prevNextMusic("init");

// Reprodução automática ao terminar a faixa
player.onended = () => {
  // Só avança se não estiver na penúltima música
  if (index < songs.length - 2) {
    prevNextMusic("next");
  } else if (index === songs.length - 2) {
    // Se estiver na penúltima, muda o ícone para play
    playPauseButton.innerHTML = textButtonPlay;
  }
  // Se estiver na penúltima, não avança para a última/ao vivo
};

// --- Cursor Customizado ---
var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');
var buttons = document.querySelectorAll('button');

document.addEventListener('mousemove', function(e){
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

// Efeito de clique no cursor personalizado
document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover');
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click');
  cursorinner.classList.remove('cursorinnerhover');
});

// Cursor reage ao passar o mouse sobre links
a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

// Cursor reage ao passar o mouse sobre botões
buttons.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

// Atualiza o estado dos botões de avançar e voltar conforme a música atual
function atualizarBotoesAvanco() {
  if (index === 0) {
    // Primeira música: ambos desativados
    nextButton.disabled = true;
    prevButton.disabled = true;
    nextButton.classList.add('botao-desativado');
    prevButton.classList.add('botao-desativado');
  } else if (index === 1) {
    // Na segunda música, desativa só o voltar
    nextButton.disabled = false;
    prevButton.disabled = true;
    nextButton.classList.remove('botao-desativado');
    prevButton.classList.add('botao-desativado');
  } else if (index === songs.length - 2) {
    // Na penúltima música, desativa só o avançar
    nextButton.disabled = true;
    prevButton.disabled = false;
    nextButton.classList.add('botao-desativado');
    prevButton.classList.remove('botao-desativado');
  } else if (index === songs.length - 1) {
    // Na última música, desativa ambos
    nextButton.disabled = true;
    prevButton.disabled = true;
    nextButton.classList.add('botao-desativado');
    prevButton.classList.add('botao-desativado');
  } else {
    // Nas demais, ambos ativos
    nextButton.disabled = false;
    prevButton.disabled = false;
    nextButton.classList.remove('botao-desativado');
    prevButton.classList.remove('botao-desativado');
  }
}

// --- Efeito Hover para o botão AO VIVO ---
document.addEventListener('mouseover', function(e) {
  if (e.target && e.target.id === "btn-ao-vivo") {
    cursor.classList.add('hover');
  }
});
document.addEventListener('mouseout', function(e) {
  if (e.target && e.target.id === "btn-ao-vivo") {
    cursor.classList.remove('hover');
  }
});

// --- Efeito Hover para o nome da música ---
musicName.addEventListener('mouseover', () => {
  // Só adiciona hover se NÃO for a primeira nem a última música
  if (index !== 0 && index !== songs.length - 1) {
    cursor.classList.add('hover');
    musicName.style.cursor = 'pointer';
  } else {
    musicName.style.cursor = 'default';
  }
});
musicName.addEventListener('mouseleave', () => {
  cursor.classList.remove('hover');
  musicName.style.cursor = 'default';
});

// --- Efeito Hover para a barra de progresso ---
progressBar.addEventListener('mouseover', () => {
  if (index !== songs.length - 1) {
    cursor.classList.add('hover');
  }
});
progressBar.addEventListener('mouseleave', () => {
  cursor.classList.remove('hover');
});