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

function gameBoard() {
  // Create a function to make a gameBoard and then populate the cells with empty strings.

  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i].push("x");
    }
  }

  // Method for UI to get the current state to render
  const getBoard = () => board;

  const 
  
    
  };


const game = gameBoard();
game.rows = 0;
console.log(game.board);
