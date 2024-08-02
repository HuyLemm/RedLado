document.addEventListener('DOMContentLoaded', function() {
  // Load header HTML
  axios.get('components/header/header.html')
    .then(response => {
      document.getElementById('header-placeholder').innerHTML = response.data;

      // Apply header CSS module
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'components/header/header.module.css';
      document.head.appendChild(link);

      const signInButton = document.getElementById('sign-in-button');
      const registerButton = document.getElementById('register-button');

      signInButton.addEventListener('click', function() {
        $('#signInModal').modal('show');
      });

      registerButton.addEventListener('click', function() {
        $('#registerModal').modal('show');
      });
    });
});
