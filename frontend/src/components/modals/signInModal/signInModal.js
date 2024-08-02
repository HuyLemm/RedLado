document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sign-in-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('signInEmail').value;
      const password = document.getElementById('signInPassword').value;
  
      // Call your sign-in API here
      console.log('Sign In:', { email, password });
  
      // Close modal
      $('#signInModal').modal('hide');
    });
  });
  