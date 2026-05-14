package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.InventarioDTO;
import edu.ues.sii.inventory_system.entity.Inventario;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.repository.InventarioRepository;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<InventarioDTO> listar() {
        return inventarioRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public InventarioDTO guardar(InventarioDTO dto) {
        Inventario inventario = convertirAEntidad(dto);
        Inventario guardado = inventarioRepository.save(inventario);
        return convertirADTO(guardado);
    }

    public InventarioDTO actualizar(Long id, InventarioDTO dto) {
        Inventario inventario = inventarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        inventario.setStock(dto.getStock());
        inventario.setUbicacion(dto.getUbicacion());
        inventario.setProducto(producto);

        Inventario actualizado = inventarioRepository.save(inventario);
        return convertirADTO(actualizado);
    }

    public void eliminar(Long id) {
        inventarioRepository.deleteById(id);
    }

    private InventarioDTO convertirADTO(Inventario inventario) {
        InventarioDTO dto = new InventarioDTO();

        dto.setId(inventario.getId());
        dto.setStock(inventario.getStock());
        dto.setUbicacion(inventario.getUbicacion());

        if (inventario.getProducto() != null) {
            dto.setProductoId(inventario.getProducto().getId());
        }

        return dto;
    }

    private Inventario convertirAEntidad(InventarioDTO dto) {
        Inventario inventario = new Inventario();

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        inventario.setStock(dto.getStock());
        inventario.setUbicacion(dto.getUbicacion());
        inventario.setProducto(producto);

        return inventario;
    }
}