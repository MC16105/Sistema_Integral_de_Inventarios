package edu.ues.sii.inventory_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

public class ProductoDTO {

    private Long id;

    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 \\-]+$",
            message = "El nombre solo debe contener letras")
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Schema(example="Ej. Laptop")
    private String nombre;


    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    @Digits(integer = 10, fraction = 2, message = "Formato de precio inválido")
    @Schema(example="Ej. 150.55")
    private Double precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Max(value = 100000, message = "Stock demasiado alto")
    @Schema(example="Ej. 55")
    private Integer stock;

    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ,.-]+$",
            message = "La descripción contiene caracteres inválidos")
    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(min = 5, max = 255, message = "La descripción debe tener entre 5 y 255 caracteres")
    @Schema(example="Ej. Breve Resumen...")
    private String descripcion;

    //GETTER Y SETTER

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public String getNombre() {
        return nombre; }
    public void setNombre(String nombre) {
        this.nombre = nombre; }

    public Double getPrecio() {
        return precio; }
    public void setPrecio(Double precio) {
        this.precio = precio; }

    public Integer getStock() {
        return stock; }
    public void setStock(Integer stock) {
        this.stock = stock; }

    public String getDescripcion() {
        return descripcion; }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion; }

}