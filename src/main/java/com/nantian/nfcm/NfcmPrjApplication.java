package com.nantian.nfcm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement //启注解事务管理
@SpringBootApplication
public class NfcmPrjApplication {

	public static void main(String[] args) {
		SpringApplication.run(NfcmPrjApplication.class, args);
	}
}
