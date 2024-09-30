import { bigIntMax, bigIntMin } from "./bigIntTools";

describe("bigIntTools", () => {
  test("bitIntMax returns the maximum value of a set of BigInts", () => {
    expect(bigIntMax(BigInt(1), BigInt(2), BigInt(3))).toEqual(BigInt(3));
  });

  test("bigIntMin returns the minimum value of a set of BigInts", () => {
    expect(bigIntMin(BigInt(1), BigInt(2), BigInt(3))).toEqual(BigInt(1));
  });
});
