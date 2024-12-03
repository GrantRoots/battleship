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

  checkTouching(y, x) {
    if (
      (this.coords[y + 1][x] === 0 || this.coords[y + 1][x] === undefined) &&
      (this.coords[y - 1][x] === 0 || this.coords[y + 1][x] === undefined) &&
      (this.coords[y][x + 1] === 0 || this.coords[y][x + 1] === undefined) &&
      (this.coords[y][x - 1] === 0 || this.coords[y][x - 1] === undefined)
    ) {
      return false;
    }
    return true;
  }

  makeShip(count, length) {
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    if (checkTouching(y, x) === true) {
      makeShip(count, length);
    }
    const newShip = new Ship(length);
    this.ships.push(newShip);
    this.coords[y][x] = newShip;
    if (length > 1) {
      let checkedDirection = [];
      function choseDirection() {
        let nextSquares = Math.floor(Math.random() * 4);
        //up
        if (nextSquares === 0 && checkedDirection.includes(0) === false) {
          for (let i = 1; i < length; i++) {
            this.coords[y - i][x] = newShip;
            if (checkTouching(y - i, x) === true) {
              //remove old squares and try next
              while (i !== 1) {
                this.coords[y - i][x] = 0;
                i--;
              }
              //change direction
              checkedDirection.push(0);
              choseDirection();
              break;
            }
          }
        }
        //down
        if (nextSquares === 1 && checkedDirection.includes(1) === false) {
          for (let i = 1; i < length; i++) {
            this.coords[y + i][x] = newShip;
            if (checkTouching(y + i, x) === true) {
              //remove old squares and try next
              while (i !== 1) {
                this.coords[y + i][x] = 0;
                i--;
              }
              //change direction
              checkedDirection.push(1);
              choseDirection();
              break;
            }
          }
        }
        //left
        if (nextSquares === 2 && checkedDirection.includes(2) === false) {
          for (let i = 1; i < length; i++) {
            this.coords[y][x - i] = newShip;
            if (checkTouching(y, x - i) === true) {
              //remove old squares and try next
              while (i !== 1) {
                this.coords[y][x - i] = 0;
                i--;
              }
              //change direction
              checkedDirection.push(2);
              choseDirection();
              break;
            }
          }
        }
        //right
        if (nextSquares === 3 && checkedDirection.includes(3) === false) {
          for (let i = 1; i < length; i++) {
            this.coords[y][x + i] = newShip;
            if (checkTouching(y, x + i) === true) {
              //remove old squares and try next
              while (i !== 1) {
                this.coords[y][x + i] = 0;
                i--;
              }
              //change direction
              checkedDirection.push(3);
              choseDirection();
              break;
            }
          }
        }
      }
      choseDirection();
    }
  }

  placeShips() {
    //randomly place ships
    //check if its touching another ship

    // 1 4 len
    makeShip(1, 4);
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
      this.coords[y][x].isSunk();
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
