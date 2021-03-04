const sendRequest = async (vote) => {
  const [tab] = await chrome.tabs.query({ active: true });
  const data = {
    vote,
    url: tab.url,
    title: tab.title,
  };
  const url = 'https://stg.postfactum.sk/api/v1/source_articles/submit/';
  // Keep both URLs for fast switching between local and remote servers
  // const url = 'http://localhost:8000/api/v1/source_articles/submit/';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}
const upvoteMenuItem = {
  id: 'upvote-link',
  title: 'upvote link',
};
const downvoteMenuItem = {
  id: 'downvote-link',
  title: 'downvote link',
};

chrome.contextMenus.create(upvoteMenuItem);
chrome.contextMenus.create(downvoteMenuItem);
chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === 'upvote-link') {
    sendRequest('upvote');
  } else if (event.menuItemId === 'downvote-link') {
    sendRequest('downvote');
  }
});
