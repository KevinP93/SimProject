package fr.simproject.spring.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;



@SpringBootApplication
@ComponentScan({"fr.simproject.spring"})
@EnableJpaRepositories("fr.simproject.spring.repository")
@EntityScan("fr.simproject.spring.model")
public class SimProjectApp {

    public static void main(String[] args){
        SpringApplication.run(SimProjectApp.class, args);
    }
}
