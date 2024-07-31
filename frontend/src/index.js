import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.getElementById('formContainer');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
  
    const loginForm = `
      <h2>Login</h2>
      <form id="loginForm">
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control" id="loginEmail" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" id="loginPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    `;
  
    const registerForm = `
      <h2>Register</h2>
      <form id="registerForm">
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" id="registerUsername" required>
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control" id="registerEmail" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" id="registerPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    `;
  
    loginLink.addEventListener('click', function() {
      formContainer.innerHTML = loginForm;
      const loginFormElement = document.getElementById('loginForm');
      loginFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        console.log('Login:', email, password);
        // Thực hiện yêu cầu đăng nhập ở đây
      });
    });
  
    registerLink.addEventListener('click', function() {
      formContainer.innerHTML = registerForm;
      const registerFormElement = document.getElementById('registerForm');
      registerFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        console.log('Register:', username, email, password);
        // Thực hiện yêu cầu đăng ký ở đây
      });
    });
  
    // Hiển thị form đăng nhập mặc định
    loginLink.click();
  });
  