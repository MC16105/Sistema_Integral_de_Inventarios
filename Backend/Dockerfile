# Etapa 1: Compilar la aplicación usando Maven con Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia el archivo de configuración de dependencias
COPY pom.xml .

# Copia el código fuente de tu API
COPY src ./src

# Compila el archivo .jar saltándonos los tests para acelerar el proceso
RUN mvn clean package -DskipTests

# Etapa 2: Crear la imagen de ejecución ligera con Java 21
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiamos el archivo .jar compilado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Exponemos el puerto real de Spring Boot
EXPOSE 8080

# Comando para arrancar tu API de Java
ENTRYPOINT ["java", "-jar", "app.jar"]
