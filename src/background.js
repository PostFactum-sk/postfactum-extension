importScripts(
  './assets/javascripts/config.js',
  './assets/javascripts/postfactum.js'
);

(async () => {
  await PostFactum.init(getConfig);

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
  chrome.contextMenus.onClicked.addListener(async (event) => {
    if (event.menuItemId === 'upvote-link') {
      await PostFactum.sendRequest('upvote');
    } else if (event.menuItemId === 'downvote-link') {
      await PostFactum.sendRequest('downvote');
    }
  });
})();
