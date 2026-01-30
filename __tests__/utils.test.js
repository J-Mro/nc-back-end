const createLookUpObj = require("../db/seeds/utils.js");

describe("createLookUpObj", () => {
  test("returns an empty object when passed an empty array", () => {
    expect(createLookUpObj([], "", "")).toEqual({});
  });
  test("returns an object with a single key-value pair when passed an array with a single object", () => {
    const testData = [{ name: "joe", age: 24 }];
    const expected = { joe: 24 };
    expect(createLookUpObj(testData, "name", "age")).toEqual(expected);
  });
  test("returns an object with mulitple key-value pairs when passed an array with multiple key value pairs", () => {
    const testData = [
      { name: "joe", age: 24 },
      { name: "maria", age: 27 },
      { name: "mardgelle", age: 29 },
      { name: "mo", age: 30 },
    ];
    const expected = { joe: 24, maria: 27, mardgelle: 29, mo: 30 };
    expect(createLookUpObj(testData, "name", "age")).toEqual(expected);
  });
  test("does not mutate original array", () => {
    const testData = [{ name: "joe", age: 24 }];
    const copyTestData = [{ name: "joe", age: 24 }];
    createLookUpObj(testData, "name", "age");
    expect(testData).toEqual(copyTestData);
  });
});
