const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

document.addEventListener('DOMContentLoaded', async function (event) {
  const rResponse = document.getElementById("r-response");
  const submitForm = document.getElementById('submit-form');
  await PostFactum.init(getConfig);

  submitForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const vote = event.submitter.name;
    await PostFactum.sendRequest(vote);
    rResponse.classList.add("r-response");
    rResponse.innerHTML = "Požiadavka bola odoslaná.<br>Ďakujeme";
    delay(() => {
      rResponse.innerHTML = "";
      rResponse.classList.remove("r-response");
    }, 2000);
  });
});
