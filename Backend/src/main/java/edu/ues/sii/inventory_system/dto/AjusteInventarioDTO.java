package edu.ues.sii.inventory_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class AjusteInventarioDTO {
    private Long id;

    @NotNull(message = "El producto es obligatorio")
    private Long productoId;

    @NotNull(message = "La cantidad ajustada es obligatoria")
    @Schema(example = "5")
    private Integer cantidadAjustada;

    @NotBlank(message = "El motivo es obligatorio")
    @Size(min = 5, max = 255,
            message = "El motivo debe tener entre 5 y 255 caracteres")
    @Schema(example = "Producto dañado")
    private String motivoAjuste;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fechaAjuste;

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

    public Integer getCantidadAjustada() {
        return cantidadAjustada; }
    public void setCantidadAjustada(Integer cantidadAjustada) {
        this.cantidadAjustada = cantidadAjustada; }

    public String getMotivoAjuste() {
        return motivoAjuste; }
    public void setMotivoAjuste(String motivoAjuste) {
        this.motivoAjuste = motivoAjuste; }

    public LocalDate getFechaAjuste() {
        return fechaAjuste; }
    public void setFechaAjuste(LocalDate fechaAjuste) {
        this.fechaAjuste = fechaAjuste; }

    public Long getUsuarioId() {
        return usuarioId; }
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId; }
}
