const getExtensionId = async (page) => {
  await page.goto('chrome://extensions');
  const extensionId = await page.evaluate(async () => {
    const [ext] = await chrome.management.getAll();
    return ext.id;
  });
  return extensionId;
};

module.exports = {
  getExtensionId,
};
