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
    try {
      await PostFactum.sendRequest(vote);
      rResponse.classList.add('r-response');
      rResponse.classList.add('response-success');
      rResponse.innerHTML = 'Požiadavka bola odoslaná.<br>Ďakujeme';
    } catch (error) {
      rResponse.classList.add('r-response');
      rResponse.classList.add('response-error');
      rResponse.innerHTML = 'Nastala chyba';
    }

    delay(() => {
      rResponse.innerHTML = '';
      rResponse.classList.remove('r-response');
      rResponse.className = rResponse.className.replace(/\bresponse-.+/, '');
    }, 2000);
  });
});
