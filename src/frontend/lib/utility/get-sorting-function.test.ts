import { describe, test, expect } from "vitest";
import { getSortingFunction } from "./get-sorting-function";

describe("getSortingFunction", () => {
  test("Should get a function that properly sorts numbers ASC", () => {
    const testItems = [
      {
        number: {
          value: 9,
        },
      },
      {
        number: {
          value: 1,
        },
      },
      {
        number: {
          value: 8,
        },
      },
      {
        number: {
          value: 4,
        },
      },
      {
        number: {
          value: 2,
        },
      },
      {
        number: {
          value: 3,
        },
      },
    ];
    const expected = [
      {
        number: {
          value: 1,
        },
      },
      {
        number: {
          value: 2,
        },
      },
      {
        number: {
          value: 3,
        },
      },
      {
        number: {
          value: 4,
        },
      },
      {
        number: {
          value: 8,
        },
      },
      {
        number: {
          value: 9,
        },
      },
    ];
    const sort = getSortingFunction({
      sortType: "number",
      direction: "ASC",
      propertyPath: "number.value",
    });

    const sorted = [...testItems].sort(sort);
    expect(JSON.stringify(sorted)).toBe(JSON.stringify(expected));
  });

  test("Should get a function that properly sorts numbers DESC", () => {
    const testItems = [
      {
        number: {
          value: 9,
        },
      },
      {
        number: {
          value: 1,
        },
      },
      {
        number: {
          value: 8,
        },
      },
      {
        number: {
          value: 4,
        },
      },
      {
        number: {
          value: 2,
        },
      },
      {
        number: {
          value: 3,
        },
      },
    ];
    const expected = [
      {
        number: {
          value: 1,
        },
      },
      {
        number: {
          value: 2,
        },
      },
      {
        number: {
          value: 3,
        },
      },
      {
        number: {
          value: 4,
        },
      },
      {
        number: {
          value: 8,
        },
      },
      {
        number: {
          value: 9,
        },
      },
    ];
    expected.reverse();

    const sort = getSortingFunction({
      sortType: "number",
      direction: "DESC",
      propertyPath: "number.value",
    });

    const sorted = [...testItems].sort(sort);
    expect(JSON.stringify(sorted)).toBe(JSON.stringify(expected));
  });

  test("Should get a function that properly sorts strings ASC", () => {
    const testItems = [
      {
        string: {
          value: "ghi",
        },
      },
      {
        string: {
          value: "abc",
        },
      },
      {
        string: {
          value: "xyz",
        },
      },
    ];
    const expected = [
      {
        string: {
          value: "abc",
        },
      },
      {
        string: {
          value: "ghi",
        },
      },
      {
        string: {
          value: "xyz",
        },
      },
    ];

    const sort = getSortingFunction({
      sortType: "string",
      direction: "ASC",
      propertyPath: "string.value",
    });

    const sorted = [...testItems].sort(sort);
    expect(JSON.stringify(sorted)).toBe(JSON.stringify(expected));
  });

  test("Should get a function that properly sorts strings ASC", () => {
    const testItems = [
      {
        string: {
          value: "ghi",
        },
      },
      {
        string: {
          value: "abc",
        },
      },
      {
        string: {
          value: "xyz",
        },
      },
    ];
    const expected = [
      {
        string: {
          value: "abc",
        },
      },
      {
        string: {
          value: "ghi",
        },
      },
      {
        string: {
          value: "xyz",
        },
      },
    ];

    expected.reverse();

    const sort = getSortingFunction({
      sortType: "string",
      direction: "DESC",
      propertyPath: "string.value",
    });

    const sorted = [...testItems].sort(sort);
    expect(JSON.stringify(sorted)).toBe(JSON.stringify(expected));
  });

  test("Should get a function that properly sorts dates ASC", () => {
    const testItems = [
      {
        date: {
          value: new Date("2024-02-03"),
        },
      },
      {
        date: {
          value: new Date("2024-02-24"),
        },
      },
      {
        date: {
          value: new Date("2024-01-01"),
        },
      },
    ];
    const expected = [
      {
        date: {
          value: new Date("2024-01-01"),
        },
      },
      {
        date: {
          value: new Date("2024-02-03"),
        },
      },
      {
        date: {
          value: new Date("2024-02-24"),
        },
      },
    ];

    const sort = getSortingFunction({
      sortType: "date",
      direction: "ASC",
      propertyPath: "date.value",
    });

    const sorted = [...testItems].sort(sort);
    expect(JSON.stringify(sorted)).toBe(JSON.stringify(expected));
  });

  test("Should get a function that properly sorts dates DESC", () => {
    const testItems = [
      {
        date: {
          value: new Date("2024-02-03"),
        },
      },
      {
        date: {
          value: new Date("2024-02-24"),
        },
      },
      {
        date: {
          value: new Date("2024-01-01"),
        },
      },
    ];
    const expected = [
      {
        date: {
          value: new Date("2024-01-01"),
        },
      },
      {
        date: {
          value: new Date("2024-02-03"),
        },
      },
      {
        date: {
          value: new Date("2024-02-24"),
        },
      },
    ];

    expected.reverse();

    const sort = getSortingFunction({
      sortType: "date",
      direction: "DESC",
      propertyPath: "date.value",
    });

    const sorted = [...testItems].sort(sort);
    expect(JSON.stringify(sorted)).toBe(JSON.stringify(expected));
  });
});

