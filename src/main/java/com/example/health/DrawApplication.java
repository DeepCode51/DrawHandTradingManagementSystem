package com.example.health;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @author Monster
 */
@SpringBootApplication
@MapperScan("com.example.health.mapper")

public class DrawApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(DrawApplication.class, args);
    }

}
