document.addEventListener('DOMContentLoaded', function() {
    const otpModal = document.getElementById('otpModal');
    const resendOtpBtn = document.getElementById('resendOtp');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const otpInputs = document.querySelectorAll('.otp-input');
  
    // Show OTP modal (this can be triggered by your app's logic)
    function showOtpModal() {
      otpModal.style.display = 'flex';
    }
  
    // Close OTP modal
    function closeOtpModal() {
      otpModal.style.display = 'none';
    }
  
    // Automatically move focus to the next input after entering a value
    otpInputs.forEach((input, index) => {
      input.addEventListener('input', function () {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });
    });
  
    // Resend OTP functionality (you can implement the logic here)
    resendOtpBtn.addEventListener('click', function(event) {
      event.preventDefault();
      console.log("Resend OTP clicked");
      // Trigger your resend OTP API call here
    });
  
    // Verify OTP (logic to verify OTP)
    verifyOtpBtn.addEventListener('click', function() {
      const otp = Array.from(otpInputs).map(input => input.value).join('');
      console.log("Entered OTP:", otp);
      // Trigger your OTP verification API call here
    });
    
    // For testing purposes, you can call showOtpModal()
    showOtpModal(); // This line can be removed once integrated with your app's flow
  });
  