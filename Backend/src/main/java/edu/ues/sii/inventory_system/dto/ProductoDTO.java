package edu.ues.sii.inventory_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProductoDTO {

    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Pattern(regexp = "^[\\p{L}0-9 -]+$",message = "El nombre contiene caracteres inválidos")
    @Schema(example = "-")
    private String nombre;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    @Digits(integer = 10, fraction = 2, message = "Formato de precio inválido")
    @Schema(example = "0.00")
    private BigDecimal precio;//Mayor exactitud de Decimales

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 1, message = "El stock debe ser mayor a 0")
    @Max(value = 100000, message = "Stock demasiado alto")
    @Schema(example = "0")
    private Integer stock;

    @NotBlank(message = "La descripción no puede estar vacía")
    @Size(min = 5, max = 255, message = "La descripción debe tener entre 5 y 255 caracteres")
    @Pattern(regexp = "^[\\p{L}0-9 ,.-]+$", message = "La descripción contiene caracteres inválidos")
    @Schema(example = "-")
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

    public BigDecimal getPrecio() {
        return precio; }
    public void setPrecio(BigDecimal precio) {
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