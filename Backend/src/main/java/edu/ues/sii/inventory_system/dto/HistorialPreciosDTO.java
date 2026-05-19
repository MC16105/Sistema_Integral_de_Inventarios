package edu.ues.sii.inventory_system.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class HistorialPreciosDTO {
    private Long id;

    @NotNull(message = "El producto es obligatorio")
    private Long productoId;

    @NotNull(message = "El precio anterior es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio anterior debe ser mayor a 0")
    private Double precioAnterior;

    @NotNull(message = "El precio nuevo es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio nuevo debe ser mayor a 0")
    private Double precioNuevo;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fechaCambio;

    // GETTERS Y SETTERS

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public Long getProductoId() {
        return productoId; }
    public void setProductoId(Long productoId) {
        this.productoId = productoId; }

    public Double getPrecioAnterior() {
        return precioAnterior; }
    public void setPrecioAnterior(Double precioAnterior) {
        this.precioAnterior = precioAnterior; }

    public Double getPrecioNuevo() {
        return precioNuevo; }
    public void setPrecioNuevo(Double precioNuevo) {
        this.precioNuevo = precioNuevo; }

    public LocalDate getFechaCambio() {
        return fechaCambio; }
    public void setFechaCambio(LocalDate fechaCambio) {
        this.fechaCambio = fechaCambio; }
}
