package edu.ues.sii.inventory_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.*;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sistema de Inventarios API")
                        .version("1.0")
                        .description("API para gestión de productos")
                        .contact(new Contact().name("Grupo 4")));
    }
}
