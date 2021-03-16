const path = require('path');
const puppeteer = require('puppeteer');
const extensionPath = path.resolve();
let browser;

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

before(async function () {
  browser = await bootBrowser();
  global.browser = browser;
});

after(async function () {
  await browser.close();
});
