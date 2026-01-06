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

  const board = document.getElementById("board");
  const turnText = document.getElementById("turn");

  let cells = [];
  let room = prompt("Room code daalo (same dono log):");

  socket.emit("join", { room });

  // 🧩 BOARD CREATE
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.onclick = () => {
      socket.emit("move", {
        room,
        index: i
      });
    };

    board.appendChild(cell);
    cells.push(cell);
  }

  // 🔁 BACKEND SE UPDATE RECEIVE
  socket.on("update", (data) => {
    const { board, player } = data;

    for (let i = 0; i < 9; i++) {
      cells[i].innerText = board[i];
      cells[i].className = "cell";

      if (board[i] === "X") cells[i].classList.add("x");
      if (board[i] === "O") cells[i].classList.add("o");
    }

    turnText.innerText = `Player ${player} Turn`;
  });

});
