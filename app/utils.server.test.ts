import { expect, test } from "vitest";
import { difference } from "./utils.server";

test("returns all elements that are in arrayA but not in arrayB", () => {
  const result = difference(["a", "b", "c"], ["b", "d"]);

  expect(result).toEqual(["a", "c"]);
});
