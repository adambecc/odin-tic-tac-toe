# odin-tic-tac-toe

## Java script code

This code represents a **Tic-Tac-Toe** game in JavaScript, structured using the **module pattern** to encapsulate different parts of the game into separate objects (Player, Gameboard, GameController). The game is controlled within an **IIFE** (Immediately Invoked Function Expression) to avoid polluting the global namespace. Below is a breakdown of the logic:

### 1. **Module Pattern with IIFE**
The whole code is wrapped inside an **IIFE** (Immediately Invoked Function Expression), which executes as soon as it is defined. This pattern helps to create an isolated scope where variables and functions are not exposed to the global context, ensuring that nothing unintentionally interferes with other parts of your code.

### 2. **Player Factory**
```javascript
const Player = (mark) => {
    return {
        mark, // The player's symbol (X or O)
    };
};
```
- **Purpose**: The `Player` factory creates player objects.
- Each player object has a `mark` property (either "X" or "O").
- The function takes the `mark` as an argument and returns an object representing a player.

### 3. **Gameboard Factory**
```javascript
const Gameboard = () => {
    const board = Array(9).fill(null); // 3x3 board

    return {
        board,
        placeMark(position, mark) { ... },
        displayBoard() { ... },
        resetBoard() { ... },
        checkWinner() { ... },
        isBoardFull() { ... },
    };
};
```
- **Purpose**: The `Gameboard` factory creates the game board and handles board-related logic.
- **board**: It's an array of 9 elements (a 3x3 Tic-Tac-Toe grid), initially filled with `null` values to represent empty cells.
- **Methods**:
  - `placeMark(position, mark)`: Places the player's mark ("X" or "O") at the specified position if it's valid and the spot is not already taken.
  - `displayBoard()`: Displays the current state of the board in the console (formatted as a 3x3 grid).
  - `resetBoard()`: Resets the board to its initial state (all `null`).
  - `checkWinner()`: Checks all possible winning combinations (rows, columns, diagonals) to see if there's a winner. If so, it returns the winning mark; otherwise, it returns `null`.
  - `isBoardFull()`: Checks if all spots on the board are filled. If all cells are filled (no `null` values left), it returns `true`.

### 4. **GameController Factory**
```javascript
const GameController = () => {
    const player1 = Player("X");
    const player2 = Player("O");
    let currentPlayer = player1;
    const gameboard = Gameboard();

    const switchPlayer = () => { ... };

    const playGame = () => { ... };

    return { playGame };
};
```
- **Purpose**: The `GameController` factory manages the game flow, including switching turns, displaying the board, checking for a winner, and handling user input.
- **player1, player2**: Creates two players with marks "X" and "O".
- **currentPlayer**: Tracks the player whose turn it is. Initially set to `player1`.
- **gameboard**: Creates a new instance of the gameboard to manage the board state.

#### Key Methods Inside `GameController`:
- **switchPlayer**: Switches between `player1` and `player2` after each turn. It uses a simple ternary operator to toggle between the two players.
  
- **playGame**: This method starts the game and controls the game loop:
  1. **Reset the board**: It starts by resetting the gameboard before the game begins.
  2. **Main loop**: The game continues in a loop until either there's a winner or the board is full (a draw).
     - **Display board**: The board is displayed after every move.
     - **Get player move**: It prompts the current player to enter a position (0-8) for their move.
     - **Invalid move check**: If the entered position is invalid (out of bounds, already occupied, or non-numeric), the game prompts the player to try again.
     - **Winner check**: After every move, the `checkWinner()` method is called. If a winner is found, the game ends and declares the winner.
     - **Switch turn**: After each valid move, the player switches turns.
     - **Draw check**: If the board is full but no winner is found, the game declares a draw.

### 5. **Game Flow**
```javascript
// Start the game
const game = Game.GameController();
game.playGame();
```
- The game starts by creating an instance of `GameController` via `Game.GameController()`.
- The `playGame()` method is called to start the game loop, where the game waits for user input, updates the board, checks for a winner, and handles the flow of the game.

### Overall Logic:
1. **Start a new game** by calling `Game.GameController()`.
2. **Players take turns** to place their marks ("X" or "O") on the gameboard by entering a position (0-8) in the prompt.
3. After each move, the board is displayed, and the system checks if there's a winner.
4. **Switch players** after every valid move.
5. The game continues until:
   - A player wins (three marks in a row, column, or diagonal).
   - The board is full, resulting in a draw.

### Example of Game Flow:
1. **Player 1 (X)** starts by entering a position (e.g., 0).
2. **Player 2 (O)** follows by entering another position (e.g., 1).
3. The game continues until:
   - One player wins (e.g., Player X forms a row of three Xs).
   - Or the game ends in a draw if no more valid moves are possible.

### Conclusion:
The game logic is simple but powerful, encapsulated in factories for `Player`, `Gameboard`, and `GameController`. The **IIFE** ensures everything is contained and prevents global variable pollution. The game progresses in a loop, alternating between players and checking for winning conditions until the game ends with a winner or a draw.