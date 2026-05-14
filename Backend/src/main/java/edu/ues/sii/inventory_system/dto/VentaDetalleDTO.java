package edu.ues.sii.inventory_system.dto;

public class VentaDetalleDTO {

    private Long productoId;
    private Integer cantidad;
    private Double precioVenta;
    private Double subtotal;

    public VentaDetalleDTO() {
    }

    public VentaDetalleDTO(Long productoId, Integer cantidad, Double precioVenta, Double subtotal) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioVenta = precioVenta;
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

    public Double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(Double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
}