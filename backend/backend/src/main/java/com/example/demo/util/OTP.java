package com.example.demo.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class OTP {

    private static final long OTP_VALID_DURATION = 180; // Thời gian hết hạn liên kết (giây)

    // Lưu trữ OTP và thời gian tạo liên kết
    private final Map<String, OtpData> otpStorage = new HashMap<>();

    // Lưu OTP và thời gian tạo liên kết vào bộ nhớ tạm thời
    public void storeOtp(String email, String otp) {
        otpStorage.put(email, new OtpData(otp, LocalDateTime.now()));
    }

    // Kiểm tra OTP
    public boolean validateOtp(String email, String otp) {
        OtpData otpData = otpStorage.get(email);
        if (otpData != null && otpData.getOtp().equals(otp)) {
            // Kiểm tra thời gian hết hạn
            if (LocalDateTime.now().isBefore(otpData.getCreationTime().plusSeconds(OTP_VALID_DURATION))) {
                otpStorage.remove(email); // Xóa OTP sau khi xác nhận thành công
                return true;
            }
        }
        return false;
    }

    // Kiểm tra thời gian hết hạn của liên kết
    public boolean isLinkExpired(String email) {
        OtpData otpData = otpStorage.get(email);
        if (otpData != null) {
            return LocalDateTime.now().isAfter(otpData.getCreationTime().plusSeconds(OTP_VALID_DURATION));
        }
        return true;
    }

    // Lớp dữ liệu OTP và thời gian tạo liên kết
    private static class OtpData {
        private final String otp;
        private final LocalDateTime creationTime;

        public OtpData(String otp, LocalDateTime creationTime) {
            this.otp = otp;
            this.creationTime = creationTime;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getCreationTime() {
            return creationTime;
        }
    }
}