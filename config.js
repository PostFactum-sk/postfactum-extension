var config = {};

(async () => {
  const setup = await chrome.management.getSelf();

  // installType is one of ['admin', 'development', 'normal', 'sideload', 'other']
  if (setup.installType === 'development') {
    config.baseURL = 'http://localhost:8000';
  } else {
    config.baseURL = 'https://stg.postfactum.sk';
  }
})();
