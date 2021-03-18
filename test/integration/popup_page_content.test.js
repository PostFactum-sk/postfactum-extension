const assert = require('assert');
const { getExtensionId } = require('./test-helper');

describe('Popup page content', () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    const extensionId = await getExtensionId(page);
    await page.goto(`chrome-extension://${extensionId}/popup.html`);
  });

  afterEach(async () => {
    await page.close();
  });

  it('checks title', async () => {
    const h1 = await page.$eval('h1', (heading) => heading.innerText);
    assert.strictEqual(h1, 'Máte pochybnosti o dôveryhodnosti tejto stránky?');
  });
});
