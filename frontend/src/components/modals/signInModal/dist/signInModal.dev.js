"use strict";

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('sign-in-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var email = document.getElementById('signInEmail').value;
    var password = document.getElementById('signInPassword').value; // Call your sign-in API here

    console.log('Sign In:', {
      email: email,
      password: password
    }); // Close modal

    $('#signInModal').modal('hide');
  });
});