"use strict";

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value; // Call your register API here

    console.log('Register:', {
      email: email,
      password: password
    }); // Close modal

    $('#registerModal').modal('hide');
  });
});