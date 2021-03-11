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