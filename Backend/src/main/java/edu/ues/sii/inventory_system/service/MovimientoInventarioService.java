package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.MovimientoInventarioDTO;
import edu.ues.sii.inventory_system.entity.MovimientoInventario;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.entity.Usuario;
import edu.ues.sii.inventory_system.repository.MovimientoInventarioRepository;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import edu.ues.sii.inventory_system.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimientoInventarioService {
    private final MovimientoInventarioRepository repo;
    private final ProductoRepository productoRepo;
    private final UsuarioRepository usuarioRepo;

    public MovimientoInventarioService(MovimientoInventarioRepository repo, ProductoRepository productoRepo, UsuarioRepository usuarioRepo) {
        this.repo = repo;
        this.productoRepo = productoRepo;
        this.usuarioRepo = usuarioRepo;
    }

    public List<MovimientoInventarioDTO> listar() {
        return repo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public MovimientoInventarioDTO guardar(
            MovimientoInventarioDTO dto) {
        MovimientoInventario m = new MovimientoInventario();
        mapToEntity(dto, m);
        return toDTO(repo.save(m)); }

    public MovimientoInventarioDTO actualizar(Long id, MovimientoInventarioDTO dto) {
        MovimientoInventario m = repo.findById(id)
                        .orElseThrow(() ->new RuntimeException("Movimiento no encontrado"));
        mapToEntity(dto, m);
        return toDTO(repo.save(m));
    }

    public void eliminar(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Movimiento no encontrado");
        }
        repo.deleteById(id);
    }

    // MAPEO

    private MovimientoInventarioDTO toDTO(MovimientoInventario m) {
        MovimientoInventarioDTO dto = new MovimientoInventarioDTO();
        dto.setId(m.getId());
        dto.setTipoMovimiento(m.getTipoMovimiento());
        dto.setCantidad(m.getCantidad());
        dto.setFechaMovimiento(m.getFechaMovimiento());
        if (m.getProducto() != null) {
            dto.setProductoId(m.getProducto().getId());
        }
        if (m.getUsuario() != null) {
            dto.setUsuarioId(m.getUsuario().getId());
        }
        return dto;
    }

    private void mapToEntity(MovimientoInventarioDTO dto, MovimientoInventario m) {
        m.setTipoMovimiento(dto.getTipoMovimiento());
        m.setCantidad(dto.getCantidad());
        m.setFechaMovimiento(dto.getFechaMovimiento());
        Producto producto = productoRepo.findById(dto.getProductoId())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Usuario usuario = usuarioRepo.findById(dto.getUsuarioId())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        m.setProducto(producto);
        m.setUsuario(usuario);
    }
}