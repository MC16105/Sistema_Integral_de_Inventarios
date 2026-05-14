package edu.ues.sii.inventory_system.dto;

import java.time.LocalDate;
import java.util.List;

public class CompraDTO {

    private Long id;
    private LocalDate fecha;
    private Double total;
    private Long proveedorId;
    private List<CompraDetalleDTO> detalles;

    public CompraDTO() {
    }

    public CompraDTO(Long id, LocalDate fecha, Double total, Long proveedorId, List<CompraDetalleDTO> detalles) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.proveedorId = proveedorId;
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

    public Long getProveedorId() {
        return proveedorId;
    }

    public void setProveedorId(Long proveedorId) {
        this.proveedorId = proveedorId;
    }

    public List<CompraDetalleDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<CompraDetalleDTO> detalles) {
        this.detalles = detalles;
    }
}