document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
  
      // Call your register API here
      console.log('Register:', { email, password });
  
      // Close modal
      $('#registerModal').modal('hide');
    });
  });
  