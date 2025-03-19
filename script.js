const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (cells[index] === "") {
        cells[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        event.target.classList.add("taken");

        if (checkWinner()) {
            status.innerText = `Player ${currentPlayer} wins!`;
            document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", handleMove));
            return;
        }

        if (cells.every(cell => cell !== "")) {
            status.innerText = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    cells = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.innerText = "Player X's turn";
    createBoard();
}

createBoard();
