async function getConfig() {
  const config = {};
  const setup = await chrome.management.getSelf();

  // installType is one of ['admin', 'development', 'normal', 'sideload', 'other']
  if (setup.installType === 'development') {
    config.baseUrl = 'http://localhost:8000';
  } else {
    config.baseUrl = 'https://stg.postfactum.sk';
  }
  return config;
}
