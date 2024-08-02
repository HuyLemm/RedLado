document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired in logIn.js');
  
    axios.get('pages/logIn/logIn.html')
      .then(response => {
        document.getElementById('login-modal-placeholder').innerHTML = response.data;
  
        const loginForm = document.getElementById('login-form');
        const errorMsg = document.getElementById('error-msg');    
  
        loginForm.addEventListener('submit', async function (e) {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
  
          try {
            const data = await loginUser({ email, password });
            console.log('Login successful:', data);
            $('#loginModal').modal('hide'); // Đóng modal sau khi đăng nhập thành công
          } catch (error) {
            errorMsg.textContent = error.message;
            errorMsg.classList.remove('d-none');
          }
        });
  
        window.showLoginModal = function() {
          console.log('showLoginModal function called');
          $('#loginModal').modal('show');
        };
      })
      .catch(error => {
        console.error('Error loading login modal:', error);
      });
  });
  