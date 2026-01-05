from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

board = [""] * 9
current_player = "X"

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("move")
def handle_move(data):
    global current_player
    i = data["index"]

    if board[i] == "":
        board[i] = current_player
        emit("update", {
            "board": board,
            "player": current_player
        }, broadcast=True)

        current_player = "O" if current_player == "X" else "X"

if __name__ == "__main__":
    socketio.run(app, debug=True)


