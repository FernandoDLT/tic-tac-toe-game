 // Variables to keep track of game state
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Winning combinations
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Function to handle a cell click
    function cellClick(cell, index) {
      if (gameState[index] === "" && gameActive) {
        gameState[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.pointerEvents = "none"; // Disable further clicks on the cell
        checkResult();
        togglePlayer();
      }
    }

    // Function to check if the game has been won or tied
    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          gameState[a] !== "" &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        document.getElementById("status").innerText =
          "Player " + currentPlayer + " wins!";
        gameActive = false;
        return;
      }

      let roundTied = !gameState.includes("");
      if (roundTied) {
        document.getElementById("status").innerText = "It's a tie!";
        gameActive = false;
        return;
      }
    }

    // Function to toggle the current player
    function togglePlayer() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // Add event listeners to the cells
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", function() {
        cellClick(this, i);
      });
    }