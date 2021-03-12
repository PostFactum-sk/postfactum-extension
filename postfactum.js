// Expects config object
const PostFactum = {
  get submitUrl() {
    return `${config.baseUrl}/api/v1/source_articles/submit/`;
  },
  sendRequest: async function (vote) {
    const [tab] = await chrome.tabs.query({ active: true });
    const data = {
      vote,
      url: tab.url,
      title: tab.title,
    };
    const response = await fetch(this.submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  },
};
