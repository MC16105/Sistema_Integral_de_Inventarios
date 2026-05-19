package edu.ues.sii.inventory_system.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class TransaccionDTO {
    private Long id;

    @NotBlank(message = "El tipo de transacción es obligatorio")
    private String tipoTransaccion;

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a 0")
    private Double monto;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fechaTransaccion;

    private Long ventaId;

    private Long compraId;

    // GETTERS Y SETTERS

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public String getTipoTransaccion() {
        return tipoTransaccion; }
    public void setTipoTransaccion(String tipoTransaccion) {
        this.tipoTransaccion = tipoTransaccion; }

    public Double getMonto() {
        return monto; }
    public void setMonto(Double monto) {
        this.monto = monto; }

    public LocalDate getFechaTransaccion() {
        return fechaTransaccion; }
    public void setFechaTransaccion(LocalDate fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion; }

    public Long getVentaId() {
        return ventaId; }
    public void setVentaId(Long ventaId) {
        this.ventaId = ventaId; }

    public Long getCompraId() {
        return compraId; }
    public void setCompraId(Long compraId) {
        this.compraId = compraId; }
}
