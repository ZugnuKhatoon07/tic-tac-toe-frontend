// alert("JS LOADED");
// const boardDiv = document.getElementById("board");
// console.log("BOARD:", boardDiv);

// const socket = io("https://tic-tac-toe-backend-69kg.onrender.com");

// //const boardDiv = document.getElementById("board");
// const turnText = document.getElementById("turn");

// let cells = [];
// let soundOn = true;

// const clickSound = new Audio(
//   "https://www.soundjay.com/buttons/sounds/button-16.mp3"
// );

// const room = prompt("Room code daalo:");

// let player = prompt("X ya O likho:").toUpperCase();
// if (player !== "X" && player !== "O") {
//   alert("Sirf X ya O allowed");
//   location.reload();
// }

// turnText.innerText = `Player ${player} Turn`;

// socket.emit("join", { room, player });

// // 🧩 BOARD CREATE (🔥 FIXED)
// for (let i = 0; i < 9; i++) {
//   const div = document.createElement("div");
//   div.className = "cell";

//   div.onclick = () => {
//     if (div.innerText) return;

//     if (soundOn) clickSound.play();

//     // 🔥 LOCAL WRITE (IMPORTANT)
//     div.innerText = player;
//     div.classList.add(player.toLowerCase());

//     // 🔁 send to other player
//     socket.emit("move", { room, index: i, player });

//     // 🔄 switch turn (optional)
//     turnText.innerText =
//       player === "X" ? "Player O Turn" : "Player X Turn";
//   };

//   boardDiv.appendChild(div);
//   cells.push(div);
// }

// // 🔁 RECEIVE OTHER PLAYER MOVE
// socket.on("move", (data) => {
//   const { index, player } = data;

//   if (!cells[index].innerText) {
//     cells[index].innerText = player;
//     cells[index].classList.add(player.toLowerCase());
//   }
// });

// // 🔄 Restart
// function restartGame() {
//   socket.emit("restart", { room });
// }

// socket.on("restart", () => {
//   cells.forEach(c => {
//     c.innerText = "";
//     c.classList.remove("x", "o");
//   });
//   turnText.innerText = "Game Restarted";
// });

// // 🎨 Theme
// function changeTheme() {
//   document.body.classList.toggle("dark");
// }

// // 🔊 Sound
// function toggleSound() {
//   soundOn = !soundOn;
//   alert(soundOn ? "Sound ON 🔊" : "Sound OFF 🔕");
// }

document.addEventListener("DOMContentLoaded", () => {

  const socket = io("https://tic-tac-toe-backend-69kg.onrender.com");
  const boardDiv = document.getElementById("board");
  const turnText = document.getElementById("turn");

  let cells = [];
  let room = prompt("Enter Room Code (same on both devices):");

  socket.emit("join", { room });

  // Board create
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.onclick = () => {
      socket.emit("move", {
        room: room,
        index: i
      });
    };

    boardDiv.appendChild(cell);
    cells.push(cell);
  }

  // 🔁 FULL BOARD UPDATE (MOST IMPORTANT)
  socket.on("update", (data) => {

    data.board.forEach((value, index) => {
      cells[index].innerText = value;
      cells[index].classList.remove("x", "o");

      if (value === "X") cells[index].classList.add("x");
      if (value === "O") cells[index].classList.add("o");
    });

    turnText.innerText = `Turn: ${data.player}`;
  });

});

// BUTTON FUNCTIONS (ERROR FIX)
function restartGame() {
  location.reload();
}

function changeTheme() {
  document.body.classList.toggle("dark");
}

function toggleSound() {
  alert("Sound feature later 🙂");
}
