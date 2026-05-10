package edu.ues.sii.inventory_system.config;

import io.swagger.v3.oas.annotations.servers.Server;
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
                        .version("1.0.0")
                        .description("""
                                API REST para la gestión de inventario.
                                Funcionalidades:
                                - Crear productos
                                - Actualizar inventario
                                - Eliminar productos
                                - Consultar stock
                                """)
                        .contact(new Contact()
                                .name("Grupo 4")
                        )
                );
    }
}