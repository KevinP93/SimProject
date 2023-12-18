package fr.simproject.spring.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages =  {"fr.simproject.spring"})
public class SimProjectApp {

    public static void main(String[] args){
        SpringApplication.run(SimProjectApp.class, args);
    }
}
