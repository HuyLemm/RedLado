"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var otpModal = document.getElementById('otpModal');
  var resendOtpBtn = document.getElementById('resendOtp');
  var verifyOtpBtn = document.getElementById('verifyOtpBtn');
  var otpInputs = document.querySelectorAll('.otp-input'); // Show OTP modal (this can be triggered by your app's logic)

  function showOtpModal() {
    otpModal.style.display = 'flex';
  } // Close OTP modal


  function closeOtpModal() {
    otpModal.style.display = 'none';
  } // Automatically move focus to the next input after entering a value


  otpInputs.forEach(function (input, index) {
    input.addEventListener('input', function () {
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
  }); // Resend OTP functionality (you can implement the logic here)

  resendOtpBtn.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Resend OTP clicked"); // Trigger your resend OTP API call here
  }); // Verify OTP (logic to verify OTP)

  verifyOtpBtn.addEventListener('click', function () {
    var otp = Array.from(otpInputs).map(function (input) {
      return input.value;
    }).join('');
    console.log("Entered OTP:", otp); // Trigger your OTP verification API call here
  }); // For testing purposes, you can call showOtpModal()

  showOtpModal(); // This line can be removed once integrated with your app's flow
});