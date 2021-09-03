"use strict";

const PhoneRegister = require("../PhoneRegister");
const phones = require("../phones.json");

describe("Testing constructor", () => {
  test("object created", () => {
    const phoneRegister = new PhoneRegister(phones);
    expect(phoneRegister.phoneRegister).toEqual(phones);
  });

  test('missing parameter throws an exception "phone data missing"', () => {
    expect(() => new PhoneRegister()).toThrow("phone data missing");
  });
});

describe("Testing getTypes", () => {
  test("use default jsonData", () => {
    const phoneRegister = new PhoneRegister(phones);
    expect(phoneRegister.getTypes()).toEqual(["home", "work", "mobile"]);
    //expect(phoneRegister.getTypes().sort()).toEqual( ["home", "work", "mobile"].sort());
  });

  test("person have no phones", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];
    const phoneRegister = new PhoneRegister(testData);
    expect(phoneRegister.getTypes()).toEqual([]);
  });

  test("no persons in phoneRegister", () => {
    const phoneRegister = new PhoneRegister([]);
    expect(phoneRegister.getTypes()).toEqual([]);
  });
});

describe("Testing getNumbersByType", () => {
  let phoneRegister;
  beforeEach(() => {
    phoneRegister = new PhoneRegister(phones);
  });

  test("get from default jsonData with parameters Leila, Hökki, work", () => {
    expect(phoneRegister.getNumbersByType("Leila", "Hökki", "work")).toEqual([
      "87654321",
      "19283654",
    ]);
  });

  test("get from default jsonData with parameters Matt, River, mobile", () => {
    expect(phoneRegister.getNumbersByType("Matt", "River", "mobile")).toEqual([
      "3486543422",
    ]);
  });

  describe("wroung type or name returns an empty array", () => {
    const testValues = [
      ["Matt", "River", "x", []],
      ["Matt", "x", "mobile", []],
      ["x", "River", "mobile", []],
    ];

    test.each(testValues)(
      'getNumbersByType("%s","%s","%s") returns %s',
      (firstname, lastname, type, expected) => {
        expect(
          phoneRegister.getNumbersByType(firstname, lastname, type)
        ).toEqual(expected);
      }
    );
  });
});

describe("missing parameter throws an exception", () => {
  test("one parameter missing", () => {
    expect(() => phoneRegister.getNumbersByType("Leila", "Hökki")).toEqual();
  });

  test("one parameter missing", () => {
    expect(() => phoneRegister.getNumbersByType("Leila", "Hökki")).toEqual();
  });

  test("one parameter missing", () => {
    expect(() => phoneRegister.getNumbersByType("Leila", "Hökki")).toEqual();
  });
});

describe(" ", () => {
  test("get all work numbers", () => {
    const exceptedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          {
            type: "home",
            number: "12345678",
          },
          {
            type: "work",
            number: "87654321",
          },
          {
            type: "work",
            number: "19283654",
          },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [
          {
            type: "home",
            number: "453735442",
          },
          {
            type: "mobile",
            number: "3486543422",
          },
          {
            type: "work",
            number: "9537288353",
          },
        ],
      },
    ];
    expect(phoneRegister.getAllNumbersByType("work"));
  });
});
