class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }
}

class Gameboard {
  constructor() {
    this.coords = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  placeShips() {
    //place ships at specific coordinates
    // 1 4len
    // 2 3len
    // 3 2len
    // 4 1len
  }

  recieveAttack(coordinates) {
    //determine if the attack hit a ship
    //then sends the hit() to the right ship
    //should it store ships in array?
    //
    //if attack misses check
  }

  allSunk() {
    //check if all ships are sunk
  }
}

class Player {
  //each should container own gameboard
  constructor() {
    this.gameboard = new Gameboard();
  }

  //highlightShips() {}
}

export { Ship, Gameboard, Player };
