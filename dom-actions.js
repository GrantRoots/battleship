import { Ship, Gameboard, Player } from "./script";

function makeSquares() {
  const boardDiv = document.createElement("div");
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    boardDiv.appendChild(square);
  }
}
