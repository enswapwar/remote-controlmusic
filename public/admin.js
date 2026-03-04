const socket = io();
const select = document.getElementById("childSelect");

socket.on("children-list", (list) => {
  select.innerHTML = "";

  list.forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    select.appendChild(option);
  });
});

document.getElementById("play").onclick = () => {
  if (!select.value) return;
  socket.emit("play", select.value);
};

document.getElementById("stop").onclick = () => {
  if (!select.value) return;
  socket.emit("stop", select.value);
};

document.getElementById("volume").oninput = (e) => {
  if (!select.value) return;
  socket.emit("volume", {
    id: select.value,
    value: parseFloat(e.target.value)
  });
};
