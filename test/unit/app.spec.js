import { InputClass } from "../../src/views/hash-input/hash-input";

describe("MD5 Hash function", () => {

  it("should always return same hash for given input value", () => {

    // Empty array that we will push hashes into
    let hashes = [];

    // Array of pre-hashed strings matching those from strings array
    let preHashed = [
      "64e8bf4574ba253b248375bd1af6c7e2",
      "f20d26a9079ac60bb5c7401d1050c62f",
      "f82413ecc07fb74bf40ccfe963a5c4b6",
      "6e5f5bbf51336918feac69b89e96f6e7",
      "ca4a08f50ee2070ee1d4e1a655c9c480",
      "a14a93ac261a5216bee95563981f6529",
      "b3dbacb87cfc4ceb030c23df35d6de5f",
      "936b118402117e34d77ddf9d081a432d",
      "5b10ec25c82e01ba98dfb38797fe8f86",
    ];

    // Some random strings
    let strings = [
      "camelCase",
      "PascalCase",
      "lowercase",
      "UPPERCASE",
      "kebab-case",
      "snake_case",
      "mix@ed121_stuff",
      "1212313",
      "2131231222,22111!!2@"
    ];

    // Hash && push
    strings.forEach((element, index) => {
      hashes.push(md5(strings[index]));
    });

    // Check if newly created hashes are equal to prehashed values
    for (let i = 0; i < hashes.length; i++) {
      expect(hashes[i]).toEqual(preHashed[i]);
    }

  });

});
