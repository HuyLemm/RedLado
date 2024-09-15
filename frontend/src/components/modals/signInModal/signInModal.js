document.addEventListener('DOMContentLoaded', function() {
  const observer = new MutationObserver(() => {
    const container = document.getElementById("container");
    const signInButton = document.getElementById("sign-in-button");
    const signInModal = document.getElementById("signInModal");
    const closeModal = document.getElementById("close-modal");
    const registerbtn = document.getElementById("register");
    const loginbtn = document.getElementById("login");
    const signInLink = document.getElementById("sign-in");
    const signUpLink = document.getElementById("sign-up");
    const closeOtpModal = document.getElementById("close-otp-modal");

    if (container && signInModal) {
      signInButton.addEventListener('click', () => {
        console.log('Sign In button clicked');
        signInModal.classList.remove('hide');
        signInModal.classList.add('show');
      });

      closeModal.addEventListener('click', () => {
        console.log('Close button clicked');
        signInModal.classList.remove('show');
        signInModal.classList.add('hide');
      });

      window.addEventListener('click', (event) => {
        if (event.target === signInModal) {
          console.log('Clicked outside modal');
          signInModal.classList.remove('show');
          signInModal.classList.add('hide');
        }
      });

      if (loginbtn) {
        loginbtn.addEventListener("click", () => {
          container.classList.remove("active");
        });
      }

      if (signInLink) {
        signInLink.addEventListener("click", () => {
          container.classList.remove("active");
        });
      }

      if (signUpLink) {
        signUpLink.addEventListener("click", () => {
          container.classList.add("active");
        });
      }

      if (registerbtn) {
        registerbtn.addEventListener("click", () => {
          console.log('Sign Up button clicked');
          container.classList.add("active");
          otpModal.classList.add("show"); // Show the OTP modal
        });
      }
    
      if (closeOtpModal) {
        closeOtpModal.addEventListener("click", () => {
          otpModal.classList.remove("show"); // Hide the OTP modal on close
        });
      }

      observer.disconnect(); // Stop observing after event listeners are set
      console.log('Modal event listeners set up');
    } else {
      console.error('Modal container elements not found');
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log('Observer set up for modal');
});
