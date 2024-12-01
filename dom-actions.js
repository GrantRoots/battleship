import { Ship, Gameboard, Player } from "./script.js";

function makeSquares() {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const square = document.createElement("div");
      square.classList.add("square");
      //id corresponds with array
      square.id = `[${y}][${x}]`;
      boardDiv.appendChild(square);
    }
  }
  return boardDiv;
}

const playerBoard = document.getElementById("playerBoard");
const computerBoard = document.getElementById("computerBoard");

playerBoard.appendChild(makeSquares());
computerBoard.appendChild(makeSquares());

const player = new Player();
const computer = new Player();

//hightlight ships
//if (player.gameboard.coords[y][x] === ship)
