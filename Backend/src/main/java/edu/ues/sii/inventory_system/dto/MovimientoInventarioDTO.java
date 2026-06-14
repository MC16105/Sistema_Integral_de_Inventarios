package edu.ues.sii.inventory_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class MovimientoInventarioDTO {
    private Long id;

    @NotNull(message = "El producto es obligatorio")
    private Long productoId;

    @NotBlank(message = "El tipo de movimiento es obligatorio")
    @Schema(example = "compra")
    private String tipoMovimiento;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    @Schema(example = "10")
    private Integer cantidad;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fechaMovimiento;

    @NotNull(message = "El usuario es obligatorio")
    private Long usuarioId;

    // GETTERS Y SETTERS

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public Long getProductoId() {
        return productoId; }
    public void setProductoId(Long productoId) {
        this.productoId = productoId; }

    public String getTipoMovimiento() {
        return tipoMovimiento; }
    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento; }

    public Integer getCantidad() {
        return cantidad; }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;}

    public LocalDate getFechaMovimiento() {
        return fechaMovimiento; }
    public void setFechaMovimiento(LocalDate fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento; }

    public Long getUsuarioId() {
        return usuarioId; }
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId; }
}
