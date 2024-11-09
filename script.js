const Game = (function () {
    
    const Player = (mark) => {
        return { mark };
    };

    const Gameboard = () => {
        const board = Array(9).fill(null);

        return {
            board,
            placeMark(position, mark) {
                if (position >= 0 && position < this.board.length && !this.board[position]) {
                    this.board[position] = mark;
                    return true;
                }
                return false;
            },
            resetBoard() {
                this.board.fill(null);
                document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ""));
            },
            checkWinner() {
                const winningCombinations = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ];

                for (const [a, b, c] of winningCombinations) {
                    if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                        return this.board[a];
                    }
                }
                return null;
            },
            isBoardFull() {
                return this.board.every(cell => cell !== null);
            },
        };
    };

    const GameController = () => {
        const player1 = Player("X");
        const player2 = Player("O");
        let playerXscore = 0;
        let playerOscore = 0;
        let currentPlayer = player1;
        const gameboard = Gameboard();
        const messageDisplay = document.getElementById("message");

        const updateScoreDisplay = () => {
            document.getElementById("playerX-score").textContent = `Player X Score: ${playerXscore}`;
            document.getElementById("playerO-score").textContent = `Player O Score: ${playerOscore}`;
        };

        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        };

        const handleClick = (event) => {
            const cellId = parseInt(event.target.id.replace("cell-", ""));
            
            if (gameboard.placeMark(cellId, currentPlayer.mark)) {
                event.target.textContent = currentPlayer.mark;

                const winner = gameboard.checkWinner();
                if (winner) {
                    messageDisplay.textContent = `Player ${winner} wins!`;
                    
                    if (winner === player1.mark) playerXscore++;
                    else playerOscore++;
                    
                    updateScoreDisplay();
                    disableBoard();
                } else if (gameboard.isBoardFull()) {
                    messageDisplay.textContent = "It's a draw!";
                } else {
                    switchPlayer();
                    messageDisplay.textContent = `Player ${currentPlayer.mark}'s turn`;
                }
            }
        };

        const disableBoard = () => {
            document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleClick));
        };

        const initializeGame = () => {
            gameboard.resetBoard();
            currentPlayer = player1;
            messageDisplay.textContent = `Player ${currentPlayer.mark}'s turn`;

            document.querySelectorAll('.cell').forEach(cell => {
                cell.addEventListener('click', handleClick);
            });
        };

        const resetScores = () => {
            playerXscore = 0;
            playerOscore = 0;
            updateScoreDisplay();
        };

        return {
            initializeGame,
            resetScores,
        };
    };

    return {
        GameController,
    };
})();

const game = Game.GameController();
game.initializeGame();

const gameResetButton = document.getElementById("reset-button");
gameResetButton.addEventListener("click", () => game.initializeGame());

const scoreResetButton = document.getElementById("reset-score");
scoreResetButton.addEventListener("click", () => game.resetScores());
