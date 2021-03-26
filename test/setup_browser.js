const path = require('path');
const puppeteer = require('puppeteer');

const rootPath = path.resolve();
const extensionPath = path.join(rootPath, '/src');
let browser;

async function bootBrowser() {
  const options = {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  };

  if (process.env.CI === 'true') {
    options.executablePath = process.env.PUPPETEER_EXEC_PATH;
  }

  return puppeteer.launch(options);
}

before(async () => {
  browser = await bootBrowser();
  global.browser = browser;
});

after(async () => {
  await browser.close();
});
