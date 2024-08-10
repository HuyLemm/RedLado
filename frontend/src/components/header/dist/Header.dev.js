"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var observer = new MutationObserver(function () {
    var signInButton = document.getElementById('sign-in-button');
    var signInModal = document.getElementById('signInModal');

    if (signInButton && signInModal) {
      signInButton.addEventListener('click', function () {
        console.log('Sign In button clicked');
        signInModal.style.display = 'flex';
        document.getElementById("container").classList.remove("active"); // Reset to Sign In view
      });
      observer.disconnect(); // Dừng quan sát sau khi các sự kiện đã được thiết lập

      console.log('Header event listeners set up');
    } else {
      console.error('Sign In button or modal not found');
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  console.log('Header script loaded');
});