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

  checkTouching(y, x, direction) {
    if (direction === "up") {
      //dont check down
      if (
        (this.coords[y - 1] === undefined || this.coords[y - 1][x] === 0) &&
        (this.coords[x + 1] === undefined || this.coords[y][x + 1] === 0) &&
        (this.coords[x - 1] === undefined || this.coords[y][x - 1] === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
    if (direction === "down") {
      //dont check up
      if (
        (this.coords[y + 1] === undefined || this.coords[y + 1][x] === 0) &&
        (this.coords[x + 1] === undefined || this.coords[y][x + 1] === 0) &&
        (this.coords[x - 1] === undefined || this.coords[y][x - 1] === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
    if (direction === "left") {
      if (
        (this.coords[y + 1] === undefined || this.coords[y + 1][x] === 0) &&
        (this.coords[y - 1] === undefined || this.coords[y - 1][x] === 0) &&
        (this.coords[x - 1] === undefined || this.coords[y][x - 1] === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
    if (direction === "right") {
      if (
        (this.coords[y + 1] === undefined || this.coords[y + 1][x] === 0) &&
        (this.coords[y - 1] === undefined || this.coords[y - 1][x] === 0) &&
        (this.coords[x + 1] === undefined || this.coords[y][x + 1] === 0)
      ) {
        return false;
      } else {
        return true;
      }
    }
    if (
      (this.coords[y + 1] === undefined || this.coords[y + 1][x] === 0) &&
      (this.coords[y - 1] === undefined || this.coords[y - 1][x] === 0) &&
      (this.coords[x + 1] === undefined || this.coords[y][x + 1] === 0) &&
      (this.coords[x - 1] === undefined || this.coords[y][x - 1] === 0)
    ) {
      return false;
    } else {
      return true;
    }
  }

  choseDirection(newShip, length, y, x, checkedDirection) {
    console.log(checkedDirection);
    let nextSquares = Math.floor(Math.random() * 4);
    while (checkedDirection.includes(nextSquares)) {
      nextSquares = Math.floor(Math.random() * 4);
    }
    //up
    if (nextSquares === 0 && checkedDirection.includes(0) === false) {
      console.log("up");
      for (let i = 1; i < length; i++) {
        //i = 3 y = 2
        if (y - i < 0) {
          i--;
          while (i !== 0) {
            this.coords[y - i][x] = 0;
            i--;
          }
          //this.coords[y][x] = 0;
          checkedDirection.push(0);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          //is this even calling again?
          break;
        }
        this.coords[y - i][x] = newShip;
        if (this.checkTouching(y - i, x, "up") === true) {
          while (i !== 0) {
            this.coords[y - i][x] = 0;
            i--;
          }
          checkedDirection.push(0);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
      }
      return;
    }
    //down
    if (nextSquares === 1 && checkedDirection.includes(1) === false) {
      console.log("down");
      for (let i = 1; i < length; i++) {
        if (y + i > 9) {
          i--;
          while (i !== 0) {
            this.coords[y + i][x] = 0;
            i--;
          }
          checkedDirection.push(1);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
        this.coords[y + i][x] = newShip;
        if (this.checkTouching(y + i, x, "down") === true) {
          while (i !== 0) {
            this.coords[y + i][x] = 0;
            i--;
          }
          checkedDirection.push(1);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
      }
      return;
    }
    //left
    if (nextSquares === 2 && checkedDirection.includes(2) === false) {
      console.log("left");
      for (let i = 1; i < length; i++) {
        if (x - i < 0) {
          i--;
          while (i !== 0) {
            this.coords[y][x - i] = 0;
            i--;
          }
          checkedDirection.push(2);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
        this.coords[y][x - i] = newShip;
        if (this.checkTouching(y, x - i, "left") === true) {
          while (i !== 0) {
            this.coords[y][x - i] = 0;
            i--;
          }
          checkedDirection.push(2);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
      }
      return;
    }
    //right
    if (nextSquares === 3 && checkedDirection.includes(3) === false) {
      console.log("right");
      for (let i = 1; i < length; i++) {
        if (x + i > 9) {
          i--;
          while (i !== 0) {
            this.coords[y][x + i] = 0;
            i--;
          }
          checkedDirection.push(3);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
        this.coords[y][x + i] = newShip;
        if (this.checkTouching(y, x + i, "right") === true) {
          while (i !== 0) {
            this.coords[y][x + i] = 0;
            i--;
          }
          checkedDirection.push(3);
          this.choseDirection(newShip, length, y, x, checkedDirection);
          break;
        }
      }
      return;
    }
    return false;
  }

  makeShip(length) {
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    if (this.checkTouching(y, x) === true) {
      this.makeShip(length);
    } else {
      const newShip = new Ship(length);
      this.ships.push(newShip);
      this.coords[y][x] = newShip;
      console.log(y, x, "first square");
      if (length > 1) {
        let checkedDirection = [];
        //all directions are invalid
        if (
          this.choseDirection(newShip, length, y, x, checkedDirection) === false
        ) {
          console.log("false called");
          this.makeShip(length);
        }
        console.log("true");
      }
    }
  }

  placeShips() {
    // 1 4 len
    this.makeShip(4);
    // 2 3len
    this.makeShip(3);
    // // 3 2len
    this.makeShip(2);
    // // 4 1len
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
