import { extractTags } from "./model";

describe("extractTags", () => {
  it("should add 2 numbers", () => {
    expect(extractTags("one #{two} #{three four} five")).toEqual([
      "#{two}",
      "#{three four}"
    ]);
  });
});
