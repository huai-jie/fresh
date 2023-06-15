import { assertEquals } from "$std/testing/asserts.ts";
import { delay } from "$std/async/delay.ts";
import { withPageName } from "$fresh/tests/test_utils.ts";

Deno.test("Test `Counter` island", {
  sanitizeResources: false,
}, async () => {
  await withPageName("./www/main.ts", async (page, address) => {
    await page.goto(`${address}/`, {
      waitUntil: "networkidle2",
    });

    const counterTextElem = await page.$(`#counter`);
    const count = +await counterTextElem?.evaluate((el) => el.textContent);
    let value = count;
    const subBtnElem = await page.$(`#sub-rounded-btn`);
    await subBtnElem?.click();
    value = +await counterTextElem?.evaluate((el) => el.textContent);
    assertEquals(value, count - 1, `Should be count - 1`);
    const addBtnElem = await page.$(`#add-rounded-btn`);
    await addBtnElem?.click();
    await delay(100);
    value = +await counterTextElem?.evaluate((el) => el.textContent);
    assertEquals(value, count, `Should be count`);
  });
});
