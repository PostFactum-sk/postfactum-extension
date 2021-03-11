importScripts('./config.js');

const sendRequest = async (vote) => {
  const [tab] = await chrome.tabs.query({ active: true });
  const data = {
    vote,
    url: tab.url,
    title: tab.title,
  };
  const url = `${config.baseURL}/api/v1/source_articles/submit/`;
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
  title: 'Dôveryhodná stránka',
};
const downvoteMenuItem = {
  id: 'downvote-link',
  title: 'Nedôveryhodná stránka',
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
