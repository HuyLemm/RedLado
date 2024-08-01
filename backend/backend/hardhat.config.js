require('@nomicfoundation/hardhat-ethers');
require('dotenv').config(); // Để sử dụng biến môi trường từ .env

// Đặt trực tiếp giá trị từ thông tin bạn đã cung cấp
const INFURA_PROJECT_ID = 'd5c391873fc540b7b117dd4e6b53ba98'; // Thay bằng Infura Project ID của bạn
const PRIVATE_KEY = 'bde3685acafac0bf25b31e6fe23a3f5d1fdc1379e95994f118ece45eff953cc3'; // Thay bằng Private Key của bạn

module.exports = {
  solidity: {
    version: "0.8.24", // Đảm bảo phiên bản này khớp với pragma trong các hợp đồng của bạn
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/d5c391873fc540b7b117dd4e6b53ba98`, // URL kết nối đến mạng Rinkeby của Infura
      accounts: [`bde3685acafac0bf25b31e6fe23a3f5d1fdc1379e95994f118ece45eff953cc3`], // Private key để ký giao dịch
    },
  },
};
