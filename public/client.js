console.log('Client-side code running');

const wakeButton = document.getElementById('wakeButton');
const pingButton = document.getElementById('pingButton');

const wakeText = document.getElementById('wakeText');
const pingText = document.getElementById('pingText');

wakeButton.addEventListener('click', function(e) {
  console.log('Wake button was clicked');
  fetch('/wake', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('PC was woken');
        wakeText.innerHTML = 'PC was woken';
        return;
      }
      throw new Error('Waking failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

pingButton.addEventListener('click', function(e) {
  console.log('Ping button was cliekced');
  fetch('/ping', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        console.log('Ping was successful');
        pingText.innerHTML = 'Ping was successful';
        return;
      }
      throw new Error('Ping failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
