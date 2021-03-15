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

describe('User downvotes page', function () {
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

  context('when popup.html', () => {
    it('clicks downvote button', async () => {
      await page.setRequestInterception(true)
      page.on('request', (request) => {
        if (request.url() === 'http://localhost:8000/api/v1/source_articles/submit/') {
          if (request.method() === 'POST') {
            request.respond({
              status: 200,
              headers: {
                'access-control-allow-origin': '*',
              },
              content: 'application/json',
              body: JSON.stringify({ ok: true }),
            });
          } else if (request.method() === 'OPTIONS') {
            request.respond({
              status: 204,
              headers: {
                'access-control-allow-headers': 'content-type',
                'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS,HEAD',
                'access-control-allow-origin': '*',
              },
            });
          }
        } else {
          request.continue();
        }
      });

      await page.click('button[name="downvote"]');
      await page.waitForSelector('.r-response');
      const responseText = await page.$eval('#r-response', response => response.innerText);
      assert.strictEqual(responseText, 'POŽIADAVKA BOLA ODOSLANÁ.\nĎAKUJEME');
    });
  });

  context('when contextMenu', () => {
    xit('clicks downvote button', async () => {
    });
  });
});
