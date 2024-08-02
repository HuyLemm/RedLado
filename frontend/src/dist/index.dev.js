"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Load header
  axios.get('components/header/header.html').then(function (response) {
    document.getElementById('header-placeholder').innerHTML = response.data;
    var signInButton = document.getElementById('sign-in-button');
    var registerButton = document.getElementById('register-button');
    signInButton.addEventListener('click', function () {
      $('#signInModal').modal('show');
    });
    registerButton.addEventListener('click', function () {
      $('#registerModal').modal('show');
    });
  }); // Load footer

  axios.get('components/footer/footer.html').then(function (response) {
    document.getElementById('footer-placeholder').innerHTML = response.data;
  }); // Load modals

  axios.get('components/modals/signInModal/signInModal.html').then(function (response) {
    document.getElementById('modals-placeholder').innerHTML += response.data;
  });
  axios.get('components/modals/registerModal/registerModal.html').then(function (response) {
    document.getElementById('modals-placeholder').innerHTML += response.data;
  });
});