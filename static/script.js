const socket = io("https://tic-tac-toe-backend-69kg.onrender.com");
const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turn");

let cells = [];
let soundOn = true;

const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

for (let i = 0; i < 9; i++) {
    let div = document.createElement("div");
    div.classList.add("cell");
    div.onclick = () => {
        if (soundOn) clickSound.play();
        socket.emit("move", { index: i });
    };
    boardDiv.appendChild(div);
    cells.push(div);
}

socket.on("update", data => {
    data.board.forEach((val, i) => {
        cells[i].innerText = val;
        cells[i].className = "cell " + (val === "X" ? "x" : "o");
    });
    turnText.innerText = "Player " + data.player + " Turn";
});

// 🔄 Restart Game
function restartGame() {
    location.reload();
}

// 🎨 Theme Change
function changeTheme() {
    document.body.classList.toggle("dark");
}

// 🔊 Sound ON/OFF
function toggleSound() {
    soundOn = !soundOn;
    alert(soundOn ? "Sound ON 🔊" : "Sound OFF 🔕");
}


//const socket = io("https://tic-tac-toe-backend-69kg.onrender.com"); 
