const path = require('path');
const puppeteer = require('puppeteer');
const assert = require("assert");
const extensionPath = path.resolve();

async function bootBrowser() {
  return puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
}

describe('Popup page content', function () {
  let browser;
  let page;
  this.timeout(20000); // default is 2 seconds and that may not be enough to boot browsers and pages.

  before(async () => {
    browser = await bootBrowser();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('chrome://extensions');
    const extensionId = await page.evaluate(async () => {
      const [ext] = await chrome.management.getAll();
      return ext.id;
    });
    await page.goto(`chrome-extension://${extensionId}/dialog.html`);
  });

  afterEach(async () => {
    await page.close();
  });

  it('checks title', async function () {
    const h1 = await page.$eval('h1', heading => heading.innerText);
    assert.strictEqual(h1, 'Máte pochybnosti o dôveryhodnosti tejto stránky?');
  });
});
