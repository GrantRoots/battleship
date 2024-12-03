import { Ship, Gameboard, Player } from "./script.js";

test("Finding array in array", () => {
  let array = [[1, 2]];
  let found = array.find((element) => element[0] === 1 && element[1] === 2);
  expect(found).toStrictEqual([1, 2]);
});
