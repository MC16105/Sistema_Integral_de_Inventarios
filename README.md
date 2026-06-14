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

## Configuración del Backend (Spring Boot)

El backend de este proyecto está construido con **Spring Boot**, generado mediante Spring Initializr y configurado con **Maven** como herramienta de compilación. Incluye dependencias principales como Spring Web, Spring Data JPA, controlador de PostgreSQL y OpenAPI (Swagger) para la documentación de la API.

El código fuente del backend se encuentra en el directorio `/Backend` del repositorio. Esta carpeta contiene el proyecto completo de Spring Boot, incluyendo el archivo `pom.xml` y la estructura `src/` organizada mediante una arquitectura en capas (controlador, servicio, repositorio, DTO, entidad, configuración).

Por defecto, el servidor se iniciará en `http://localhost:8080`.

## Estructura del Proyecto (Backend)

La estructura de este proyecto se basa en la arquitectura N Capas (N-Tier), de manera que se organiza de manera separada, en modulos independientes. La estructura es la siguiente

- controller/ -> Manejo de Endpoint HTTP
- service/ -> Logica de negocio
- repository/ -> Acceso a datos con JPA 
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
- @Digits->Control de Formato decimal

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

En resumen: Es la respuesta del login al frontend.

- Role enum, ¿Qué es?
Es una enumeración de roles de usuario.

¿Para qué sirve?
Define los permisos del sistema.

Ejemplo:

public enum Role {
    USER,
    ADMIN
}

Uso:
- Control de acceso
- Autorización en endpoints

Ejemplo: @PreAuthorize("hasRole('ADMIN')")

## Configuración y Estructura del Frontend

La interfaz de usuario está desarrollada bajo el enfoque Mobile First, garantizando una experiencia fluida y responsiva en dispositivos móviles y de escritorio. Se utiliza maquetación limpia en HTML5, estilos avanzados en CSS3 y manipulación dinámica del DOM mediante JavaScript nativo (Vanilla JS).

Los archivos se encuentran en el directorio /Frontend del repositorio:
- proveedores.html: Estructura del formulario de gestión y tabla de visualización con los 5 campos alineados al DTO.
- script.js: Lógica de captura de datos, validaciones en cliente (simulación de `@NotBlank`) y renderizado dinámico de filas.
- styles.css: Estilos responsivos y diseño adaptativo.

El flujo de datos simulado en esta etapa es:
Formulario (UI) -> Validación JS -> Manipulación del DOM -> Renderizado en Tabla

## Desarrollo de la Capa Frontend (Interfaz de Usuario)

Se diseñó e implementó un sistema de diseño visual cohesivo, responsivo y moderno para la gestión del inventario, utilizando HTML5, CSS3 y JavaScript (Vanilla JS). El frontend cuenta con una barra de navegación unificada que permite el intercambio fluido entre los diferentes módulos operativos del sistema.

### Módulos Desarrollados:

1. Gestión de Proveedores (`proveedores.html`)
   - Formulario adaptativo para el registro de nuevos proveedores con captura de campos clave: *Nombre del Proveedor* y *Teléfono*.
   - Tabla dinámica con acciones de control y validación de campos obligatorios directamente en el cliente.

2. Gestión de Productos (`productos.html`)
   - Interfaz completa para la administración del catálogo de inventario.
   - Campos integrados y alineados a las reglas del Backend: *Código, Nombre del Producto, Precio, Stock* y *Descripción*.
   - Estructura de tabla preparada para renderizar de forma asíncrona la data del controlador.

3. Historial de Precios (`historialprecios.html`)
   - Módulo especializado para el rastreo y auditoría de cambios en los costos de los productos.
   - Formulario de captura para: *Identificador de Producto, Precio Anterior, Precio Nuevo* y *Fecha de Modificación*.

### Características Técnicas del Frontend:
- Diseño Limpio y Profesional: Uso de paleta de colores corporativa (azul oscuro/blanco) con tipografías legibles y espaciados optimizados para la concentración del usuario.
- Validaciones Nativas: Implementación de alertas de obligatoriedad en campos críticos antes de procesar los datos de los formularios.
- Arquitectura Escalable: Estructura de carpetas (`/Frontend`) separada e independiente para facilitar la futura conexión vía Fetch API con los controladores de Spring Boot.

### NPM - REACT 
Verificar si existe Node y NPM
- node -v
- npm -v
- git --version

Crear carpeta REACT
- npm create vite@latest frontend-react
- Seleccionar REACT
- Seleccionar JavaScript

Ejecutar por Pirmera Vez
- npm run dev

Instalar Axios
- npm install axios

Archivos Instalados en este Proyecto
- npm install react-icons
- npm install react-toastify
- npm install react-router-dom










