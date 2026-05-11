Integrantes - Grupo #4

=== SISTEMA INTEGRAL DE INVENTARIOS ===
_____________________________________________________
| N°| ALUMNO                              | CARNET  |
|---|-------------------------------------|---------|
| 1 | LUIS FERNANDO MORAN CASTRO         	| MC16105 |
| 2 | JOSE FERNANDO GUADRON LANDAVERDE	  | GL23032 |
| 3 | LUIS ALEJANDRO LOPEZ MENJIVAR 	    | LM23037 |
| 4 | JUAN PABLO JOSE MARTINEZ SANTAMARIA | MS24013 |
| 5 | IRENE GUADALUPE LEON MADRID         |	LM24048 |
|---|-------------------------------------|---------|

## Configuración del Backend (Spring Boot)

El backend de este proyecto está construido con **Spring Boot**, generado mediante Spring Initializr y configurado con **Maven** como herramienta de compilación. Incluye dependencias principales como Spring Web, Spring Data JPA, controlador de PostgreSQL y OpenAPI (Swagger) para la documentación de la API.

El código fuente del backend se encuentra en el directorio `/Backend` del repositorio. Esta carpeta contiene el proyecto completo de Spring Boot, incluyendo el archivo `pom.xml` y la estructura `src/` organizada mediante una arquitectura en capas (controlador, servicio, repositorio, DTO, entidad, configuración).

Por defecto, el servidor se iniciará en `http://localhost:8080`.

## Estructura del Proyecto (Backend)

La estructura de este proyecto se basa en la arquitectura N Capas (N-Tier), de manera que se organiza de manera separada, en modulos independientes. La estructura es la siguiente

- controller/ -> Manejo de Endpoint HTTP
- service/ -> Logica de negocio
- repository/ -> Acceso a datos con JPS
- entity/ -> Representacion de la Tabla en la DB
- dto/ -> Transferencia de datos entre capas
- config/ 
- exception/

Con esto se logra el siguiente flujo

Controller -> Service & (DTO) -> Repository -> DB
                
## Validaciones Implementadas  (README Actualizado 20-04-2026)

Se añadieron validaciones para garantizar la integridad de los datos

- @NotBlank -> No permite valores vacios
- @Pattern -> Solo letras (Y caracteres validos)
- @Size -> Longitud controlada
- @NotNull -> Campo obligatorio
- @Min -> No permite valores negativos
- @Max -> Límite máximo permitido
- @Digists->Control de Formato decimal

## Normalización de datos

Se implementó limpieza y estandarización de datos en la capa Service:

- Eliminación de espacios con .trim()
- Conversión de texto a minúsculas (toLowerCase())
- Aplicado en:
-- Método toEntity() (creación)
-- Método actualizar()

## Consideraciones importantes

- Los IDs en base de datos no se reinician automáticamente (comportamiento normal)
- Validaciones en backend complementan pero no sustituyen validaciones frontend
- Se recomienda mantener separación clara entre Entity y DTO

## Estado actual

✔ API funcional
✔ CRUD completo
✔ Validaciones implementadas
✔ Persistencia en PostgreSQL
✔ Documentación interactiva disponible

## Creacion de @RestControllerAdvice ( - exception/)

Es una anotación de Spring que permite manejar errores de forma global en toda una API.

¿Para qué sirve?
- Capturar excepciones automáticamente
- Personalizar respuestas de error
- Evitar código repetido
- Hacer un API más limpia y profesional

Cómo funciona?
- Ocurre un error (ej: validación)
- Spring lanza una excepción
- @RestControllerAdvice la intercepta
- Devuelve una respuesta personalizada

## ¿Qué error maneja?

@MethodArgumentNotValidException

Se lanza cuando fallan validaciones como:

- @NotNull
- @NotBlank
- @Min
- @Pattern

## Ventajas

- Código más limpio
- Respuestas claras para el cliente
- Centraliza manejo de errores
- Escalable (puedes agregar más excepciones)

## Spring Security + JWT (10/05/2026)

Spring Security 
Esta es la base de seguridad en Spring Boot.
¿Qué te da automáticamente?
- Protección de endpoints (API)
- Sistema de autenticación (login)
- Sistema de autorización (roles: USER, ADMIN, etc.)
- Filtros de seguridad en cada request
- Password encoding (BCrypt por defecto)
- Sesiones o manejo de seguridad stateless (según config)

Importante
Al agregar esta dependencia:
TODOS los endpoints quedan protegidos por defecto
Pedirá login automáticamente (form login o basic auth)

JWT ¿Para qué sirve?
Esta librería sirve para crear, firmar y validar tokens JWT.
¿Qué es JWT en un sistema?

Es un token que representa un usuario autenticado.

Ejemplo:

" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... "
Flujo típico en un proyecto:

- Usuario hace login (/auth/login)
- Backend valida usuario
- Backend genera JWT con jjwt
- Backend devuelve el token al frontend
- Frontend lo guarda (localStorage o cookies)
- En cada request:
" Authorization: Bearer TOKEN "
- Spring Security valida el token antes de permitir acceso

¿Cómo trabajan juntos?

___________________________________________________________
| Spring Security     | JWT                               |
|---------------------|-----------------------------------|
| Protege Endpoint    | Identifica al Usaurio             |
| Controla Acceso     | Prueba que el usuario es Valido   |
| Filtra Request 	    | Proporciona el Token de Identidad |
|---------------------|-----------------------------------|

Spring Security	JWT
Protege endpoints	Identifica al usuario
Controla acceso	Prueba que el usuario es válido
Filtra requests	Proporciona el token de identidad

- Spring Security es el “guardia”
- JWT es la “credencial”
