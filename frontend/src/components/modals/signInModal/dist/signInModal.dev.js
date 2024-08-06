"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var observer = new MutationObserver(function () {
    var container = document.getElementById("container");
    var closeModal = document.getElementById("close-modal");
    var registerbtn = document.getElementById("register");
    var loginbtn = document.getElementById("login");
    var signInLink = document.getElementById("sign-in");
    var signUpLink = document.getElementById("sign-up");
    var signInModal = document.getElementById('signInModal');

    if (container && signInModal) {
      if (registerbtn) {
        registerbtn.addEventListener("click", function () {
          console.log('Register button clicked');
          container.classList.add("active");
        });
      }

      if (loginbtn) {
        loginbtn.addEventListener("click", function () {
          console.log('Login button clicked');
          container.classList.remove("active");
        });
      }

      if (signInLink) {
        signInLink.addEventListener("click", function () {
          console.log('Sign In link clicked');
          container.classList.remove("active");
        });
      }

      if (signUpLink) {
        signUpLink.addEventListener("click", function () {
          console.log('Sign Up link clicked');
          container.classList.add("active");
        });
      }

      if (closeModal) {
        closeModal.addEventListener('click', function () {
          console.log('Close button clicked');
          signInModal.style.display = 'none';
        });
      }

      window.addEventListener('click', function (event) {
        if (event.target === signInModal) {
          console.log('Clicked outside modal');
          signInModal.style.display = 'none';
        }
      });
      observer.disconnect(); // Dừng quan sát sau khi các sự kiện đã được thiết lập

      console.log('Modal event listeners set up');
    } else {
      console.error('Modal container elements not found');
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  console.log('SignInModal script loaded');
});