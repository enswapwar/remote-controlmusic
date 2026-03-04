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
  socket.emit("play", select.value);
};

document.getElementById("stop").onclick = () => {
  socket.emit("stop", select.value);
};

document.getElementById("volume").oninput = (e) => {
  socket.emit("volume", {
    id: select.value,
    value: parseFloat(e.target.value)
  });
};
