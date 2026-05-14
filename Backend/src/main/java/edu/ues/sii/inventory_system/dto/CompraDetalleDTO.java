package edu.ues.sii.inventory_system.dto;

public class CompraDetalleDTO {

    private Long productoId;
    private Integer cantidad;
    private Double precioCompra;
    private Double subtotal;

    public CompraDetalleDTO() {
    }

    public CompraDetalleDTO(Long productoId, Integer cantidad, Double precioCompra, Double subtotal) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioCompra = precioCompra;
        this.subtotal = subtotal;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
}