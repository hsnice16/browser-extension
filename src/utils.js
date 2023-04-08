import path from "path";
import puppeteer from "puppeteer";

/**
 *
 * @returns chrome browser
 */
async function getBrowser() {
  const extensionPath = path.join(__dirname, "..", "build");

  return await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });
}

/**
 *
 * @param {Browser} browser reference to the chrome browser
 * @returns the base url of the extension
 */
function getBaseURL(browser) {
  const extensionTarget = browser
    .targets()
    .find((target) => target.type() === "service_worker");
  const partialExtensionUrl = extensionTarget?.url() || "";
  const [, , extensionId] = partialExtensionUrl.split("/");

  return `chrome-extension://${extensionId}`;
}

/**
 *
 * @param {Browser} browser reference to the chrome browser
 * @returns {Page} page
 */
async function getPage(browser) {
  const page = await browser.newPage();
  const baseURL = getBaseURL(browser);

  await page.goto(`${baseURL}/index.html`, { waitUntil: "load" });
  await page.bringToFront();
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  return page;
}

/**
 *
 * @returns Promise
 */
export async function setUpBrowser() {
  const browser = await getBrowser();
  const page = await getPage(browser);

  return { browser, page };
}
