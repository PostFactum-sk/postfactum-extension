importScripts('./config.js');
importScripts('./postfactum.js');

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
    PostFactum.sendRequest('upvote');
  } else if (event.menuItemId === 'downvote-link') {
    PostFactum.sendRequest('downvote');
  }
});
