/* global PostFactum, getConfig */
const delay = (() => {
  let timer = 0;
  return (callback, ms) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

document.addEventListener('DOMContentLoaded', async () => {
  const rResponse = document.getElementById('r-response');
  const submitForm = document.getElementById('submit-form');
  await PostFactum.init(getConfig);

  submitForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const vote = event.submitter.name;
    await PostFactum.sendRequest(vote);
    rResponse.classList.add('r-response');
    rResponse.innerHTML = 'Požiadavka bola odoslaná.<br>Ďakujeme';
    delay(() => {
      rResponse.innerHTML = '';
      rResponse.classList.remove('r-response');
    }, 2000);
  });
});
