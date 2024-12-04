import { Ship, Gameboard, Player } from "./script.js";

test("Finding array in array", () => {
  let array = [[1, 2]];
  let found = array.find((element) => element[0] === 1 && element[1] === 2);
  expect(found).toStrictEqual([1, 2]);
});

test("find number in array", () => {
  let array = [1, 2, 3];
  expect(array.includes(2)).toBe(true);
});

test("undefined array index", () => {
  let array = [0];
  expect(array[0 - 1]).toBe(undefined);
});

test("undefined array true or false", () => {
  let array = [0];
  expect(array[0 - 1] === undefined).toBe(undefined);
});
