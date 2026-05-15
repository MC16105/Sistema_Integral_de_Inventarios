package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.DetalleVentaDTO;
import edu.ues.sii.inventory_system.dto.VentaCreateDTO;
import edu.ues.sii.inventory_system.dto.VentaDTO;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.entity.Venta;
import edu.ues.sii.inventory_system.entity.DetalleVenta;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import edu.ues.sii.inventory_system.repository.UsuarioRepository;
import edu.ues.sii.inventory_system.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // CREAR VENTA
    public VentaDTO crear(VentaCreateDTO dto) {
        Venta venta = new Venta();
        venta.setFechaVenta(LocalDateTime.now());
        venta.setClienteNombre(dto.getClienteNombre());
        venta.setClienteEmail(dto.getClienteEmail());
        venta.setUsuario(
                usuarioRepository.findById(dto.getUsuarioId())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado")) );

        List<DetalleVenta> detalles = new ArrayList<>();
        double total = 0;
        for (DetalleVentaDTO d : dto.getDetalles()) {
            Producto producto = productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // VALIDAR STOCK
            if (producto.getStock() < d.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto ID: " + producto.getId()); }
            DetalleVenta detalle = new DetalleVenta();
            detalle.setProducto(producto);
            detalle.setCantidad(d.getCantidad());
            detalle.setPrecioUnitario(d.getPrecioUnitario());
            detalle.setVenta(venta);
            total += d.getCantidad() * d.getPrecioUnitario();

            // RESTAR STOCK
            producto.setStock(producto.getStock() - d.getCantidad());
            detalles.add(detalle);
        }

        venta.setDetalles(detalles);
        venta.setMontoTotal(total);
        return toDTO(ventaRepository.save(venta));
    }

    // LISTAR
    public List<VentaDTO> listar() {
        return ventaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList(); }

    // OBTENER POR ID
    public VentaDTO obtenerPorId(Long id) {
        Venta venta = ventaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        return toDTO(venta); }

    // ELIMINAR (devuelve stock)
    public void eliminar(Long id) {
        Venta venta = ventaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        // DEVOLVER STOCK
        for (DetalleVenta d : venta.getDetalles()) {
            Producto p = d.getProducto();
            p.setStock(p.getStock() + d.getCantidad()); }
        ventaRepository.delete(venta); }

    // DTO
    private VentaDTO toDTO(Venta venta) {
        VentaDTO dto = new VentaDTO();
        dto.setId(venta.getId());
        dto.setFechaVenta(venta.getFechaVenta());
        dto.setMontoTotal(venta.getMontoTotal());
        dto.setClienteNombre(venta.getClienteNombre());
        dto.setClienteEmail(venta.getClienteEmail());
        dto.setUsuarioId(venta.getUsuario().getId());
        List<DetalleVentaDTO> detallesDTO = venta.getDetalles()
                .stream()
                .map(d -> {
                    DetalleVentaDTO det = new DetalleVentaDTO();
                    det.setProductoId(d.getProducto().getId());
                    det.setCantidad(d.getCantidad());
                    det.setPrecioUnitario(d.getPrecioUnitario());
                    return det;
                })
                .toList();
        dto.setDetalles(detallesDTO);
        return dto; }
}