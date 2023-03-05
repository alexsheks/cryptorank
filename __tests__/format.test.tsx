import "@testing-library/jest-dom";

import { convertValue, fromATH, nFormatter, toATH } from "../src/utils/format";

describe("calculate from ATH", () => {
  test("integer value", () => {
    expect(fromATH(100, 0)).toBe(-100);
    expect(fromATH(0, 100)).toBe(Infinity);
    expect(fromATH(100, 10)).toBe(-90);
    expect(fromATH(10, 100)).toBe(900);
    expect(fromATH(-3, 100)).toBeNaN();
  });

  test("float value", () => {
    expect(fromATH(100.933, 10.933)).toBe(-89.16806198171064);
    expect(fromATH(10.933, 100.933)).toBe(823.1958291411324);
  });
});

describe("calculate to ATH", () => {
  test("integer value", () => {
    expect(toATH(100, 0)).toBe(Infinity);
    expect(toATH(0, 100)).toBe(-100);
    expect(toATH(100, 10)).toBe(900);
    expect(toATH(10, 100)).toBe(-90);
    expect(toATH(-3, 100)).toBeNaN();
  });

  test("float value", () => {
    expect(toATH(100.933, 10.933)).toBeCloseTo(823.195);
    expect(toATH(10.933, 100.933)).toBeCloseTo(-89.168);
  });
});

describe("format big values", () => {
  test("there is a letter in value", () => {
    expect(nFormatter(1008235837257, 6)).toMatch("T");
    expect(nFormatter(1008235837257, 6)).not.toMatch("K");
    expect(nFormatter(1008235837, 6)).toMatch("B");
    expect(nFormatter(1008235837, 6)).not.toMatch("T");
    expect(nFormatter(1008235, 3)).toMatch("M");
    expect(nFormatter(1008235, 3)).not.toMatch("B");
    expect(nFormatter(1008, 1)).toMatch("K");
    expect(nFormatter(1008, 1)).not.toMatch("M");
  });

  test("there is no letter in value", () => {
    expect(nFormatter(100, 2)).toMatch("");
    expect(nFormatter(1, 5)).toMatch("");
  });
});

describe("convert one currency to another", () => {
  test("integer value", () => {
    expect(convertValue(5, 100, 10)).toBe(50);
    expect(convertValue(0, 100, 10)).toBe(0);
    expect(convertValue(-2, 100, 10)).toBeNaN();
    expect(convertValue(5, 0, 10)).toBe(0);
    expect(convertValue(5, 10, 0)).toBe(Infinity);
  });

  test("float value", () => {
    expect(convertValue(5, 100.5, 10.5)).toBeCloseTo(47.857);
    expect(convertValue(2, 10.5, 100.5)).toBeCloseTo(0.208);
  });
});
