"use strict";

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired in logIn.js');
  axios.get('pages/logIn/logIn.html').then(function (response) {
    document.getElementById('login-modal-placeholder').innerHTML = response.data;
    var loginForm = document.getElementById('login-form');
    var errorMsg = document.getElementById('error-msg');
    loginForm.addEventListener('submit', function _callee(e) {
      var email, password, data;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              email = document.getElementById('email').value;
              password = document.getElementById('password').value;
              _context.prev = 3;
              _context.next = 6;
              return regeneratorRuntime.awrap(loginUser({
                email: email,
                password: password
              }));

            case 6:
              data = _context.sent;
              console.log('Login successful:', data);
              $('#loginModal').modal('hide'); // Đóng modal sau khi đăng nhập thành công

              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              errorMsg.textContent = _context.t0.message;
              errorMsg.classList.remove('d-none');

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[3, 11]]);
    });

    window.showLoginModal = function () {
      console.log('showLoginModal function called');
      $('#loginModal').modal('show');
    };
  })["catch"](function (error) {
    console.error('Error loading login modal:', error);
  });
});