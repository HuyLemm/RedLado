package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    // Lưu trữ OTP tạm thời với email làm key
    private final Map<String, String> otpStorage = new HashMap<>();

    // Lưu OTP vào bộ nhớ tạm thời
    public void storeOtp(String email, String otp) {
        otpStorage.put(email, otp);
    }

    // Kiểm tra OTP
    public boolean validateOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email);  // Xóa OTP sau khi xác nhận thành công
            return true;
        }
        return false;
    }
}
