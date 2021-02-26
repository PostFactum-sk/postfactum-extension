const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

function sendRequest(vote) {
  chrome.tabs.getSelected(null, async function (tab) {
    const data = {
      vote,
      url: tab.url,
      title: tab.title,
    };
    const url = 'https://stg.postfactum.sk/api/v1/source_articles/submit/';
    // Keep both URLs for fast switching between local and remote servers
    // const url = 'http://127.0.0.1:8000/api/v1/source_articles/submit/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseDiv = document.getElementById("r-response");
    responseDiv.classList.add("r-response");
    responseDiv.innerHTML = "Požiadavka bola odoslaná.<br>Ďakujeme";
    delay(function () {
      responseDiv.innerHTML = "";
      responseDiv.classList.remove("r-response");
    }, 2000);
  })
}

document.getElementById('submit-page').addEventListener('click', function () {
  sendRequest("submit_url")
});

document.getElementById('up-vote').addEventListener('click', function () {
  sendRequest("upvote_url")
});

document.getElementById('down-vote').addEventListener('click', function () {
  sendRequest("downvote_url")
});