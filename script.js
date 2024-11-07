const Game = (function () {
    // Player Factory
    const Player = (mark) => {
        return {
            mark, // The player's symbol (X or O)
        };
    };

    // Gameboard Factory
    const Gameboard = () => {
        const board = Array(9).fill(null); // 3x3 board

        return {
            board,
            placeMark(position, mark) {
                if (position >= 0 && position < this.board.length && !this.board[position]) {
                    this.board[position] = mark;
                    return true;
                }
                return false;
            },
            displayBoard() {
                console.log(`
                ${this.board[0] || " "} | ${this.board[1] || " "} | ${this.board[2] || " "}
                ---------
                ${this.board[3] || " "} | ${this.board[4] || " "} | ${this.board[5] || " "}
                ---------
                ${this.board[6] || " "} | ${this.board[7] || " "} | ${this.board[8] || " "}
                `);
            },
            resetBoard() {
                this.board.fill(null);
            },
            checkWinner() {
                const winningCombinations = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
                    [0, 4, 8], [2, 4, 6]               // diagonals
                ];

                for (const combination of winningCombinations) {
                    const [a, b, c] = combination;
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

    // Game Controller Factory
    const GameController = () => {
        const player1 = Player("X");
        const player2 = Player("O");
        let currentPlayer = player1;
        const gameboard = Gameboard();

        const switchPlayer = () => {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        };

        const playGame = () => {
            gameboard.resetBoard();
            let winner = null;

            while (!winner && !gameboard.isBoardFull()) {
                gameboard.displayBoard();
                let position = parseInt(prompt(`Player ${currentPlayer.mark}, enter your move (0-8):`));

                if (isNaN(position) || position < 0 || position > 8 || !gameboard.placeMark(position, currentPlayer.mark)) {
                    console.log("Invalid move. Try again.");
                    continue;
                }

                winner = gameboard.checkWinner();
                if (winner) {
                    gameboard.displayBoard();
                    console.log(`Player ${winner} wins!`);
                    break;
                }

                switchPlayer(); // Switch turns
            }

            if (!winner) {
                gameboard.displayBoard();
                console.log("It's a draw!");
            }
        };

        return {
            playGame,
        };
    };

    return {
        GameController,
    };
})();

// Start the game
const game = Game.GameController();
game.playGame();
