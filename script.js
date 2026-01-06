const socket = io("https://tic-tac-toe-backend-69kg.onrender.com");

const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turn");

let cells = [];
let soundOn = true;

const clickSound = new Audio(
  "https://www.soundjay.com/buttons/sounds/button-16.mp3"
);

// 🔑 ROOM & PLAYER
const room = prompt("Room code daalo (same dono log use kare):");
const player = prompt("X ya O likho:");

socket.emit("join", { room, player });

// 🧩 BOARD CREATE
for (let i = 0; i < 9; i++) {
  let div = document.createElement("div");
  div.classList.add("cell");
  div.onclick = () => {
    if (soundOn) clickSound.play();
    socket.emit("move", {
      room: room,
      index: i,
      player: player
    });
  };
  boardDiv.appendChild(div);
  cells.push(div);
}

// 🔁 UPDATE BOARD
socket.on("move", (data) => {
  const { index, player } = data;

  if (!cells[index].innerText) {
    cells[index].innerText = player;
    cells[index].classList.add(player.toLowerCase());
  }
});

// 🔄 Restart
function restartGame() {
  socket.emit("restart", { room });
}

// 🔄 Restart response
socket.on("restart", () => {
  cells.forEach(c => (c.innerText = ""));
  turnText.innerText = "Game Restarted";
});

// 🎨 Theme
function changeTheme() {
  document.body.classList.toggle("dark");
}

// 🔊 Sound
function toggleSound() {
  soundOn = !soundOn;
  alert(soundOn ? "Sound ON 🔊" : "Sound OFF 🔕");
}



//const socket = io("https://tic-tac-toe-backend-69kg.onrender.com"); 
