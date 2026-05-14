package edu.ues.sii.inventory_system.dto;

import java.time.LocalDate;
import java.util.List;

public class VentaDTO {

    private Long id;
    private LocalDate fecha;
    private Double total;
    private List<VentaDetalleDTO> detalles;

    public VentaDTO() {
    }

    public VentaDTO(Long id, LocalDate fecha, Double total, List<VentaDetalleDTO> detalles) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.detalles = detalles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<VentaDetalleDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<VentaDetalleDTO> detalles) {
        this.detalles = detalles;
    }
}
