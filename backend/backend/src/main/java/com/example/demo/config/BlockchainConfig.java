package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.protocol.Web3j;

import com.example.demo.connect.Web3jClient;

@Configuration
public class BlockchainConfig {

    @Bean
    public Web3j web3j() {
        return Web3jClient.getWeb3j();
    }
}
