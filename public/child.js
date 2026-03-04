const socket = io();
const audio = document.getElementById("audio");
const fileInput = document.getElementById("fileInput");
const confirmBtn = document.getElementById("confirm");
const activateBtn = document.getElementById("activate");
const status = document.getElementById("status");

let registered = false;

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    audio.src = URL.createObjectURL(file);
  }
});

confirmBtn.addEventListener("click", () => {
  if (!audio.src) return;
  socket.emit("register-child");
  registered = true;
  status.textContent = "登録済み";
});

activateBtn.addEventListener("click", () => {
  audio.play().then(() => audio.pause());
});

socket.on("play", () => {
  if (registered) audio.play();
});

socket.on("stop", () => {
  if (registered) {
    audio.pause();
    audio.currentTime = 0;
  }
});

socket.on("volume", (v) => {
  if (registered) audio.volume = v;
});
