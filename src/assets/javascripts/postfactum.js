const PostFactum = {
  get submitUrl() {
    return `${this.config.baseUrl}/api/v1/source_articles/submit/`;
  },

  async sendRequest(vote) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
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

  async init(getConfig) {
    this.config = await getConfig();
  },
};
