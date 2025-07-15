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

  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = ["", "", ""];
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
      spotsTaken++;
      return true;
    } else {
      return false;
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
    checkWin,
    resetBoard,
    isFull,
    getBoard,
  };
};

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  let gameOver = false;

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const resetGame = () => {
    board.resetBoard(); // Gameboard handles board
    activePlayer = players[0]; // GameController handles flow
    gameOver = false;
    console.log("Game has been reset!");
    printNewRound();
  };

  const playRound = (row, col) => {
    if (gameOver) return;

    // if (!board.isValidSpot(row, col)) {
    //   console.log("Invalid move.");
    //   return;
    // }

    if (!board.placeMarker(row, col, activePlayer.token)) {
      console.log("Invalid move.");
      return;
    }

    if (board.checkWin(row, col, activePlayer.token)) {
      board.printBoard();
      console.log(`${activePlayer.name} wins!`);
      gameOver = true;
      // resetGame(); // add btn
      return "win";
    } else if (board.isFull()) {
      console.log("It's a draw!");
      gameOver = true;
      // resetGame(); // add btn
      return "draw";
    }

    printNewRound();
    switchPlayerTurn();
  };

  return {
    playRound,
    printNewRound,
    getActivePlayer,
    resetGame,
    getBoard: board.getBoard,
  };
}

const testGame = GameController();

const boardElement = document.querySelector(".board");

const renderBoard = () => {
  boardElement.innerHTML = "";
  const currentBoard = testGame.getBoard(); // ← expose getBoard in GameController
  currentBoard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.row = rowIndex;
      cellDiv.dataset.col = colIndex;
      cellDiv.textContent = cell;
      boardElement.appendChild(cellDiv);
      console.log(currentBoard[rowIndex][colIndex]);
    });
  });
  console.log(currentBoard);
  console.log("Rendering....");
};
testGame.playRound(0, 1);
testGame.playRound(0, 2);
testGame.playRound(1, 2);
testGame.playRound(1, 1);
testGame.playRound(0, 0);
testGame.playRound(2, 0);
renderBoard();
