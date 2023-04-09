import { setUpBrowser } from "../src/utils";

jest.setTimeout(60000);

describe("E2E Extension", () => {
  let page;

  beforeAll(async () => {
    ({ page } = await setUpBrowser());
  });

  it("must see the You're staring at my extension text", async () => {
    const h1Ele = await page.$("[data-testing-id=h1-ele]");
    const h1EleText = await page.evaluate(
      (element) => element.innerText.trim(),
      h1Ele
    );

    const expectedH1EleText = "You're staring at my extension";
    expect(h1EleText).toBe(expectedH1EleText);
  });
});
