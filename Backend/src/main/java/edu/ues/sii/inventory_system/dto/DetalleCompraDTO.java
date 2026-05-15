package edu.ues.sii.inventory_system.dto;

public class DetalleCompraDTO {
    private Long productoId;
    private Integer cantidad;
    private Double precioUnitario;

    // GET Y SET
    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }

}
