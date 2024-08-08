document.addEventListener('DOMContentLoaded', function() {
  const observer = new MutationObserver(() => {
    const container = document.getElementById("container");
    const closeModal = document.getElementById("close-modal");
    const registerbtn = document.getElementById("register");
    const loginbtn = document.getElementById("login");
    const signInLink = document.getElementById("sign-in");
    const signUpLink = document.getElementById("sign-up");
    const signInModal = document.getElementById('signInModal');

    if (container && signInModal) {
      if (registerbtn) {
        registerbtn.addEventListener("click", () => {
          console.log('Register button clicked');
          container.classList.add("active");
        });
      }

      if (loginbtn) {
        loginbtn.addEventListener("click", () => {
          console.log('Login button clicked');
          container.classList.remove("active");
        });
      }

      if (signInLink) {
        signInLink.addEventListener("click", () => {
          console.log('Sign In link clicked');
          container.classList.remove("active");
        });
      }

      if (signUpLink) {
        signUpLink.addEventListener("click", () => {
          console.log('Sign Up link clicked');
          container.classList.add("active");
        });
      }

      if (closeModal) {
        closeModal.addEventListener('click', () => {
          console.log('Close button clicked');
          signInModal.classList.remove('show');
          setTimeout(() => {
            signInModal.style.display = 'none';
          }, 500); // Matches the animation duration in CSS
        });
      }

      window.addEventListener('click', (event) => {
        if (event.target === signInModal) {
          console.log('Clicked outside modal');
          signInModal.classList.remove('show');
          setTimeout(() => {
            signInModal.style.display = 'none';
          }, 500); // Matches the animation duration in CSS
        }
      });

      observer.disconnect(); // Dừng quan sát sau khi các sự kiện đã được thiết lập
      console.log('Modal event listeners set up');
    } else {
      console.error('Modal container elements not found');
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log('SignInModal script loaded');
});
