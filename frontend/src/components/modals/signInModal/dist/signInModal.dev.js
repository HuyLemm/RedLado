"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var observer = new MutationObserver(function () {
    var container = document.getElementById("container");
    var signInButton = document.getElementById("sign-in-button");
    var signInModal = document.getElementById("signInModal");
    var closeModal = document.getElementById("close-modal");
    var registerbtn = document.getElementById("register");
    var loginbtn = document.getElementById("login");
    var signInLink = document.getElementById("sign-in");
    var signUpLink = document.getElementById("sign-up");
    var closeOtpModal = document.getElementById("close-otp-modal");

    if (container && signInModal) {
      signInButton.addEventListener('click', function () {
        console.log('Sign In button clicked');
        signInModal.classList.remove('hide');
        signInModal.classList.add('show');
      });
      closeModal.addEventListener('click', function () {
        console.log('Close button clicked');
        signInModal.classList.remove('show');
        signInModal.classList.add('hide');
      });
      window.addEventListener('click', function (event) {
        if (event.target === signInModal) {
          console.log('Clicked outside modal');
          signInModal.classList.remove('show');
          signInModal.classList.add('hide');
        }
      });

      if (loginbtn) {
        loginbtn.addEventListener("click", function () {
          container.classList.remove("active");
        });
      }

      if (signInLink) {
        signInLink.addEventListener("click", function () {
          container.classList.remove("active");
        });
      }

      if (signUpLink) {
        signUpLink.addEventListener("click", function () {
          container.classList.add("active");
        });
      }

      if (registerbtn) {
        registerbtn.addEventListener("click", function () {
          console.log('Sign Up button clicked');
          container.classList.add("active");
          otpModal.classList.add("show"); // Show the OTP modal
        });
      }

      if (closeOtpModal) {
        closeOtpModal.addEventListener("click", function () {
          otpModal.classList.remove("show"); // Hide the OTP modal on close
        });
      }

      observer.disconnect(); // Stop observing after event listeners are set

      console.log('Modal event listeners set up');
    } else {
      console.error('Modal container elements not found');
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  console.log('Observer set up for modal');
});