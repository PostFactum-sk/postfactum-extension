const rResponse = document.getElementById("r-response");
const submitForm = document.getElementById('submit-form');

const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

async function sendRequest(vote) {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.getSelected(null, async (tab) => {
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
        return resolve(response);
      });
    } catch (error) {
      return reject(error)
    }
  });
}

submitForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const vote = event.submitter.name;
  await sendRequest(vote);
  rResponse.classList.add("r-response");
  rResponse.innerHTML = "Požiadavka bola odoslaná.<br>Ďakujeme";
  delay(() => {
    rResponse.innerHTML = "";
    rResponse.classList.remove("r-response");
  }, 2000);
});