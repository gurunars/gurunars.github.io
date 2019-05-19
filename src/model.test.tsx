import { extractTags } from "./model";

describe("extractTags", () => {
  it("should extract and reformat both the curly wrapped and plain tags", () => {
    expect(extractTags("one #{two} #{three four} five #six seven")).toEqual([
      "one #{two} #{three four} five #{six} seven",
      ["two", "three four", "six"]
    ]);
  });

  it("should iclude extra hashes into the tag value", () => {
    expect(extractTags("one ###hash")).toEqual(["one #{##hash}", ["##hash"]]);
  });

  it("should include extra left curly parantheses", () => {
    expect(extractTags("one #{{{foo}")).toEqual(["one #{{{foo}", ["{{foo"]]);
  });

  it("should exclude extra right curly parantheses", () => {
    expect(extractTags("one #{foo}}}}")).toEqual(["one #{foo}}}}", ["foo"]]);
  });

  it("should include the whole string if the end is unbalanced", () => {
    expect(extractTags("one #{foo")).toEqual(["one #{foo}", ["foo"]]);
  });
});
