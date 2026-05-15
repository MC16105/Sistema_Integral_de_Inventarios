package edu.ues.sii.inventory_system.dto;

public class InventarioDTO {

    private Long id;
    private Integer stock;
    private String ubicacion;
    private Long productoId;

    public InventarioDTO() {
    }

    public Long getId() {
        return id;
    }

    public Integer getStock() {
        return stock;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }
}