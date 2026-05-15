package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.CompraCreateDTO;
import edu.ues.sii.inventory_system.dto.CompraDTO;
import edu.ues.sii.inventory_system.dto.DetalleCompraDTO;
import edu.ues.sii.inventory_system.entity.Compra;
import edu.ues.sii.inventory_system.entity.DetalleCompra;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.repository.CompraRepository;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import edu.ues.sii.inventory_system.repository.ProveedorRepository;
import edu.ues.sii.inventory_system.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // CREAR COMPRA
    public CompraDTO crear(CompraCreateDTO dto) {
        Compra compra = new Compra();
        compra.setFechaCompra(LocalDateTime.now());
        compra.setProveedor(
                proveedorRepository.findById(dto.getProveedorId())
                        .orElseThrow(() -> new RuntimeException("Proveedor no encontrado")) );
        compra.setUsuario(
                usuarioRepository.findById(dto.getUsuarioId())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado")) );

        List<DetalleCompra> detalles = new ArrayList<>();
        double total = 0;
        for (DetalleCompraDTO d : dto.getDetalles()) {
            Producto producto = productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            DetalleCompra detalle = new DetalleCompra();
            detalle.setProducto(producto);
            detalle.setCantidad(d.getCantidad());
            detalle.setPrecioUnitario(d.getPrecioUnitario());
            detalle.setCompra(compra);
            total += d.getCantidad() * d.getPrecioUnitario();

            // SUMAR STOCK
            producto.setStock(producto.getStock() + d.getCantidad());
            detalles.add(detalle); }

        compra.setDetalles(detalles);
        compra.setMontoTotal(total);
        return toDTO(compraRepository.save(compra)); }

    // LISTAR TODAS
    public List<CompraDTO> listar() {
        return compraRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList(); }

    // OBTENER POR ID
    public CompraDTO obtenerPorId(Long id) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
        return toDTO(compra); }

     // ELIMINAR (con control de stock)
    public void eliminar(Long id) {
        Compra compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
        // RESTAR STOCK
        for (DetalleCompra d : compra.getDetalles()) {
            Producto p = d.getProducto();
            p.setStock(p.getStock() - d.getCantidad()); }
        compraRepository.delete(compra);
    }

    // CONVERSIÓN A DTO
    private CompraDTO toDTO(Compra compra) {
        CompraDTO dto = new CompraDTO();
        dto.setId(compra.getId());
        dto.setFechaCompra(compra.getFechaCompra());
        dto.setMontoTotal(compra.getMontoTotal());
        dto.setProveedorId(compra.getProveedor().getId());
        dto.setUsuarioId(compra.getUsuario().getId());
        List<DetalleCompraDTO> detallesDTO = compra.getDetalles()
                .stream()
                .map(d -> {
                    DetalleCompraDTO det = new DetalleCompraDTO();
                    det.setProductoId(d.getProducto().getId());
                    det.setCantidad(d.getCantidad());
                    det.setPrecioUnitario(d.getPrecioUnitario());
                    return det;
                })
                .toList();
        dto.setDetalles(detallesDTO);
        return dto; }
}