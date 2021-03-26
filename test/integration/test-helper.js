function randomFrom(collection) {
  const randomIndex = Math.floor(Math.random() * collection.length);
  const statusCode = collection[randomIndex];
  return statusCode;
}

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
  randomFrom,
};
