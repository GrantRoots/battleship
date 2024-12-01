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
      highlightShip.style.backgroundColor = "red";
    }
  }
}
