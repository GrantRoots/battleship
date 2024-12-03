import { Ship, Gameboard, Player } from "./script.js";

function makeSquares(name) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const square = document.createElement("div");
      square.classList.add("square");
      //id corresponds with array
      square.id = `[${y}][${x}]${name}`;
      boardDiv.appendChild(square);
    }
  }
  return boardDiv;
}

const playerBoard = document.getElementById("playerBoard");
const computerBoard = document.getElementById("computerBoard");
const turn = document.getElementById("turn");

playerBoard.appendChild(makeSquares("player"));
computerBoard.appendChild(makeSquares("computer"));

const player = new Player();
const computer = new Player();

player.gameboard.placeShips();
computer.gameboard.placeShips();

//hightlight ships
for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    if (player.gameboard.coords[y][x] !== 0) {
      const highlightShip = document.getElementById(`[${y}][${x}]player`);
      highlightShip.style.backgroundColor = "darkred";
    }
  }
}

const computerSquares = document.querySelectorAll(".computer-board .square");
function playerTurn() {
  turn.textContent = "Your Turn!";
  const controller = new AbortController();
  computerSquares.forEach((square) => {
    square.addEventListener(
      "click",
      () => {
        //click square to attack
        const coordinates = square.id.slice(0, -8);
        const y = coordinates[1];
        const x = coordinates[4];
        if (computer.gameboard.recieveAttack(y, x) === true) {
          square.style.backgroundColor = "red";
          if (computer.gameboard.coords[y][x].sunk === true) {
            square.textContent = "sunk";
            if (computer.gameboard.allSunk() === true) {
              gameOver("Player");
              controller.abort();
            }
          }
        } else {
          square.style.backgroundColor = "black";
          controller.abort();
          // do I need a next turn function? to start comp turn
          computerTurn();
        }
      },
      { signal: controller.signal },
    );
  });
}

function computerTurn() {
  turn.textContent = "Computer's Turn!";
  setTimeout(() => {
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    const square = document.getElementById(`[${y}][${x}]player`);
    if (player.gameboard.recieveAttack(y, x) === true) {
      square.style.backgroundColor = "red";
      if (player.gameboard.coords[y][x].sunk === true) {
        square.textContent = "Sunk";
        if (player.gameboard.allSunk() === true) {
          gameOver("Computer");
        }
      }
    } else {
      square.style.backgroundColor = "black";
      playerTurn();
    }
  }, 1000);
}

function gameOver(winner) {
  turn.textContent = `${winner} Wins!!!`;
}

playerTurn();
