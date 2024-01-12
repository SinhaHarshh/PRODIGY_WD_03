const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

board.addEventListener('click', handleCellClick);

function handleCellClick(event) {
    const index = Array.from(cells).indexOf(event.target);

    if (index !== -1 && gameBoard[index] === '' && gameActive) {
        makeMove(index, currentPlayer);

        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
            endGame();
        } else if (isBoardFull()) {
            showResult('It\'s a draw!');
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                // AI makes a move after a short delay
                setTimeout(makeAiMove, 500);
            }
        }
    }
}

function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
}

function makeAiMove() {
    const emptyCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMove = emptyCells[randomIndex];

    makeMove(aiMove, 'O');

    if (checkWinner()) {
        showResult('AI wins!');
        endGame();
    } else if (isBoardFull()) {
        showResult('It\'s a draw!');
        endGame();
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function showResult(message) {
    statusDisplay.textContent = message;
}

function endGame() {
    gameActive = false;
    board.removeEventListener('click', handleCellClick);
}