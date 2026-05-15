package edu.ues.sii.inventory_system.dto;

import java.util.List;

public class CompraCreateDTO {
    private Long proveedorId;
    private Long usuarioId;
    private List<DetalleCompraDTO> detalles;

    // GET Y SET
    public Long getProveedorId() { return proveedorId; }
    public void setProveedorId(Long proveedorId) { this.proveedorId = proveedorId; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public List<DetalleCompraDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleCompraDTO> detalles) { this.detalles = detalles; }

}
