/*
- Tic Tac Toe, 3x3 board, can interact with the cells to fill them up with either a x or a o
[][][]
[][][]
[][][]

 Things im stuck on:
 - how do i create the gameBoard
 - how to check diagonals from both sides, i.e [0][2],[1][1],[2][0] and [0][0],[1][1],[2][2]
 - how do we handle a draw logic
 - how to check rows and columns for win condition  

 IDEAS:
 functiion to print board to track
 function to check if move is valid -> both bounds and if cell is empty
 function to check if the player that moved won -> either all cells full or 3 in a row
 function for game loop ideally a iife until player has won or draw


  Repeat the following steps until a winner is determined or the game ends in a draw:

  Display the current state of the board.
  Get the next move from the current player.
  Validate the move.
  Update the board with the move.
  Check for a winner. 
*/

const Gameboard = function () {
  // Create a function to make a gameBoard and then populate the cells with empty strings.

  const rows = 3;
  const cols = 3;
  const board = [];

  let spotsTaken = 0;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(""); // "" denotes empty cell
    }
  }

  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      console.log(board[i]);
    }
  };
  // Method for UI to get the current state to render
  const getBoard = () => board;
  // Method to check if spot to place marker is valid
  const isValidSpot = (row, col) => {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      return false;
    } else if (isFull() || board[row][col] !== "") {
      return false;
    } else {
      return true;
    }
  };
  // Method to place marker on the board
  const placeMarker = (row, col, marker) => {
    // We must check if the current spot is a valid spot.
    if (isValidSpot(row, col)) {
      board[row][col] = marker;
      console.log(`Successful placement at ${row}, ${col}`);
      spotsTaken++;
      checkWin(row, col, marker);
    } else {
      console.log("Invalid placement");
    }
  };

  // Checks if the board is full
  const isFull = () => {
    return spotsTaken == 9;
  };

  // checks if after current placement someone has won
  const checkWin = (row, col, marker) => {
    const checkRow = () => {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        if (board[row][colIndex] !== marker) {
          return false;
        }
      }
      return true;
    };

    const checkCol = () => {
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        if (board[rowIndex][col] !== marker) {
          return false;
        }
      }
      return true;
    };

    const checkDiagonal = () => {
      // check for main diagonal -> top left to bottom right
      const isOnDiagonal = () => {
        return row + col == 2 || row == col;
      };

      if (!isOnDiagonal()) return false;

      if (row == col) {
        if (
          board[0][0] === marker &&
          board[1][1] === marker &&
          board[2][2] === marker
        ) {
          return true;
        }
      }
      // check for anti-diagonal -> top right to bottom left
      if (row + col == 2) {
        if (
          board[0][2] === marker &&
          board[1][1] === marker &&
          board[2][0] === marker
        ) {
          return true;
        }
      }
      // not on main or anti diagonals so no winning condition
      return false;
    };

    return checkRow() || checkCol() || checkDiagonal();
  };

  return {
    placeMarker,
    printBoard,
  };
};

const testGame = Gameboard();

testGame.printBoard();
