const assert = require('assert');
const {
  getExtensionId,
  randomFrom,
} = require('./test-helper');

describe('User upvotes page', () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    const extensionId = await getExtensionId(page);
    await page.goto(`chrome-extension://${extensionId}/popup.html`);
  });

  afterEach(async () => {
    await page.close();
  });

  context('when popup.html', () => {
    context('when success', () => {
      it('displays receipt message', async () => {
        await page.setRequestInterception(true);
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

        await page.click('button[name="upvote"]');
        await page.waitForSelector('.r-response');
        const responseText = await page.$eval('#r-response', (response) => response.innerText);
        assert.strictEqual(responseText, 'POŽIADAVKA BOLA ODOSLANÁ.\nĎAKUJEME');
      });
    });

    context('when failure', () => {
      it('displays error message for 4xx and 5xx codes', async () => {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
          if (request.url() === 'http://localhost:8000/api/v1/source_articles/submit/') {
            if (request.method() === 'POST') {
              request.respond({
                status: randomFrom([400, 401, 403, 500, 502, 503]),
                headers: {
                  'access-control-allow-origin': '*',
                },
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

        await page.click('button[name="upvote"]');
        await page.waitForSelector('.r-response');
        const responseText = await page.$eval('#r-response', (response) => response.innerText);
        assert.strictEqual(responseText, 'NASTALA CHYBA');
      });
    });
  });
});
