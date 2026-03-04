const socket = io();
const select = document.getElementById("childSelect");

socket.on("children-list", (list) => {
  select.innerHTML = "";

  list.forEach(child => {
    const option = document.createElement("option");
    option.value = child.id;        // 内部ID
    option.textContent = child.name; // 表示は名前
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
