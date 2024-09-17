package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private static final long OTP_VALID_DURATION = 40; // Thời gian tồn tại của OTP (giây)

    // Lưu trữ OTP cùng với thời gian hết hạn
    private final Map<String, OtpData> otpStorage = new HashMap<>();

    // Lớp nội bộ để lưu OTP và thời gian hết hạn
    private static class OtpData {
        private final String otp;
        private final LocalDateTime expireTime;

        public OtpData(String otp, LocalDateTime expireTime) {
            this.otp = otp;
            this.expireTime = expireTime;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getExpireTime() {
            return expireTime;
        }
    }

    // Lưu OTP vào bộ nhớ tạm thời
    public void storeOtp(String email, String otp) {
        LocalDateTime expireTime = LocalDateTime.now().plusSeconds(OTP_VALID_DURATION);
        otpStorage.put(email, new OtpData(otp, expireTime));
    }

    // Kiểm tra OTP
    public boolean validateOtp(String email, String otp) {
        OtpData otpData = otpStorage.get(email);

        // Kiểm tra nếu không có OTP cho email này hoặc OTP đã hết hạn
        if (otpData == null || LocalDateTime.now().isAfter(otpData.getExpireTime())) {
            otpStorage.remove(email); // Xóa OTP đã hết hạn
            return false; // OTP không hợp lệ hoặc đã hết hạn
        }

        // Kiểm tra OTP có đúng không
        if (otpData.getOtp().equals(otp)) {
            otpStorage.remove(email); // Xóa OTP sau khi xác nhận thành công
            return true; // OTP hợp lệ
        }

        return false; // OTP không đúng
    }
}
