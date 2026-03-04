const socket = io();
const audio = document.getElementById("audio");
const fileInput = document.getElementById("fileInput");
const activateBtn = document.getElementById("activate");

socket.emit("register-child");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    audio.src = URL.createObjectURL(file);
  }
});

activateBtn.addEventListener("click", () => {
  audio.play().then(() => audio.pause());
});

socket.on("play", () => {
  audio.play();
});

socket.on("stop", () => {
  audio.pause();
  audio.currentTime = 0;
});

socket.on("volume", (v) => {
  audio.volume = v;
});
