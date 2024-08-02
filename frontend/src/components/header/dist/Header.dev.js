"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Load header HTML
  axios.get('components/header/header.html').then(function (response) {
    document.getElementById('header-placeholder').innerHTML = response.data; // Apply header CSS module

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'components/header/header.module.css';
    document.head.appendChild(link);
    var signInButton = document.getElementById('sign-in-button');
    var registerButton = document.getElementById('register-button');
    signInButton.addEventListener('click', function () {
      $('#signInModal').modal('show');
    });
    registerButton.addEventListener('click', function () {
      $('#registerModal').modal('show');
    });
  });
});