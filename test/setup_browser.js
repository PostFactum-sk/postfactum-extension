const path = require('path');
const puppeteer = require('puppeteer');

const rootPath = path.resolve();
const extensionPath = path.join(rootPath, '/src');
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

before(async () => {
  browser = await bootBrowser();
  global.browser = browser;
});

after(async () => {
  await browser.close();
});
