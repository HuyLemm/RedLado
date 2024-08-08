package com.example.demo.connect;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

public class Web3jClient {

    private static final String INFURA_URL = "https://sepolia.infura.io/v3/d5c391873fc540b7b117dd4e6b53ba98";

    private static Web3j web3j;

    public static Web3j getWeb3j() {
        if (web3j == null) {
            web3j = Web3j.build(new HttpService(INFURA_URL));
        }
        return web3j;
    }
}
