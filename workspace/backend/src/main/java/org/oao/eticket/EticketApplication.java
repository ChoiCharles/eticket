package org.oao.eticket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class EticketApplication {

	public static void main(String[] args) {
		SpringApplication.run(EticketApplication.class, args);
	}

}
