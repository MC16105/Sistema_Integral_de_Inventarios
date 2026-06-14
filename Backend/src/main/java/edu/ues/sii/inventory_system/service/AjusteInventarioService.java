package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.AjusteInventarioDTO;
import edu.ues.sii.inventory_system.entity.AjusteInventario;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.entity.Usuario;
import edu.ues.sii.inventory_system.repository.AjusteInventarioRepository;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import edu.ues.sii.inventory_system.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AjusteInventarioService {
    private final AjusteInventarioRepository repo;
    private final ProductoRepository productoRepo;
    private final UsuarioRepository usuarioRepo;

    public AjusteInventarioService(AjusteInventarioRepository repo, ProductoRepository productoRepo, UsuarioRepository usuarioRepo) {
        this.repo = repo;
        this.productoRepo = productoRepo;
        this.usuarioRepo = usuarioRepo;
    }

    public List<AjusteInventarioDTO> listar() {
        return repo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AjusteInventarioDTO guardar(
            AjusteInventarioDTO dto) {
        AjusteInventario a = new AjusteInventario();
        mapToEntity(dto, a);
        return toDTO(repo.save(a));
    }

    public AjusteInventarioDTO actualizar(Long id, AjusteInventarioDTO dto) {
        AjusteInventario a = repo.findById(id)
                        .orElseThrow(() -> new RuntimeException("Ajuste no encontrado"));
        mapToEntity(dto, a);
        return toDTO(repo.save(a));
    }

    public void eliminar(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Ajuste no encontrado");
        }
        repo.deleteById(id);
    }

    // MAPEO

    private AjusteInventarioDTO toDTO(AjusteInventario a) {
        AjusteInventarioDTO dto = new AjusteInventarioDTO();
        dto.setId(a.getId());
        dto.setCantidadAjustada(a.getCantidadAjustada());
        dto.setMotivoAjuste(a.getMotivoAjuste());
        dto.setFechaAjuste(a.getFechaAjuste());
        if (a.getProducto() != null) {
            dto.setProductoId(a.getProducto().getId());
        }
        if (a.getUsuario() != null) {
            dto.setUsuarioId(a.getUsuario().getId());
        }
        return dto;
    }

    private void mapToEntity(AjusteInventarioDTO dto, AjusteInventario a) {
        a.setCantidadAjustada(dto.getCantidadAjustada());
        a.setMotivoAjuste(dto.getMotivoAjuste());
        a.setFechaAjuste(dto.getFechaAjuste());
        Producto producto = productoRepo.findById(dto.getProductoId())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        Usuario usuario = usuarioRepo.findById(dto.getUsuarioId())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        a.setProducto(producto);
        a.setUsuario(usuario);
    }
}
