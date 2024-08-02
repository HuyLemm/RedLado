import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
  const footer = document.getElementById('footer');
  axios.get('/src/components/footer/footer.html')
    .then(response => {
      footer.innerHTML = response.data;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});
