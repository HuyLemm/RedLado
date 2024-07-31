"use strict";

require("bootstrap/dist/css/bootstrap.min.css");

require("bootstrap/dist/js/bootstrap.bundle.min.js");

document.addEventListener("DOMContentLoaded", function () {
  var formContainer = document.getElementById('formContainer');
  var loginLink = document.getElementById('loginLink');
  var registerLink = document.getElementById('registerLink');
  var loginForm = "\n      <h2>Login</h2>\n      <form id=\"loginForm\">\n        <div class=\"form-group\">\n          <label>Email address</label>\n          <input type=\"email\" class=\"form-control\" id=\"loginEmail\" required>\n        </div>\n        <div class=\"form-group\">\n          <label>Password</label>\n          <input type=\"password\" class=\"form-control\" id=\"loginPassword\" required>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n      </form>\n    ";
  var registerForm = "\n      <h2>Register</h2>\n      <form id=\"registerForm\">\n        <div class=\"form-group\">\n          <label>Username</label>\n          <input type=\"text\" class=\"form-control\" id=\"registerUsername\" required>\n        </div>\n        <div class=\"form-group\">\n          <label>Email address</label>\n          <input type=\"email\" class=\"form-control\" id=\"registerEmail\" required>\n        </div>\n        <div class=\"form-group\">\n          <label>Password</label>\n          <input type=\"password\" class=\"form-control\" id=\"registerPassword\" required>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n      </form>\n    ";
  loginLink.addEventListener('click', function () {
    formContainer.innerHTML = loginForm;
    var loginFormElement = document.getElementById('loginForm');
    loginFormElement.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = document.getElementById('loginEmail').value;
      var password = document.getElementById('loginPassword').value;
      console.log('Login:', email, password); // Thực hiện yêu cầu đăng nhập ở đây
    });
  });
  registerLink.addEventListener('click', function () {
    formContainer.innerHTML = registerForm;
    var registerFormElement = document.getElementById('registerForm');
    registerFormElement.addEventListener('submit', function (event) {
      event.preventDefault();
      var username = document.getElementById('registerUsername').value;
      var email = document.getElementById('registerEmail').value;
      var password = document.getElementById('registerPassword').value;
      console.log('Register:', username, email, password); // Thực hiện yêu cầu đăng ký ở đây
    });
  }); // Hiển thị form đăng nhập mặc định

  loginLink.click();
});