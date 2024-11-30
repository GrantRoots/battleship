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
  //do I need this?
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
    this.ships = [];
  }

  placeShips() {
    //place ships at specific coordinates
    // 1 4len
    const fourShip = new Ship(4);
    this.ships.push(fourShip);
    this.coords[9][0] = fourShip;
    this.coords[9][1] = fourShip;
    this.coords[9][2] = fourShip;
    this.coords[9][3] = fourShip;
    // 2 3len
    const threeShipOne = new Ship(3);
    this.ships.push(threeShipOne);
    this.coords[7][0] = threeShipOne;
    this.coords[7][1] = threeShipOne;
    this.coords[7][2] = threeShipOne;
    // 3 2len
    const twoShipOne = new Ship(2);
    this.ships.push(twoShipOne);
    this.coords[5][0] = twoShipOne;
    this.coords[5][1] = twoShipOne;
    // 4 1len
    const oneShipOne = new Ship(1);
    this.ships.push(oneShipOne);
    this.coords[3][0] = oneShipOne;
  }

  recieveAttack(y, x) {
    //determine if the attack hit a ship
    //then sends the hit() to the right ship
    if (this.coords[y][x] !== 0) {
      this.coords[y][x].hit();
      return true;
    }
    //missed attack
    return false;
  }

  allSunk() {
    //check if all ships are sunk
    let totalSunk = 0;
    this.ships.forEach((ship) => {
      if (ship.sunk === true) {
        totalSunk++;
      }
    });
    if (totalSunk === this.ships.length) {
      return true;
    }
    return false;
  }
}

class Player {
  //each should container own gameboard
  constructor() {
    this.gameboard = new Gameboard();
  }
}

export { Ship, Gameboard, Player };
