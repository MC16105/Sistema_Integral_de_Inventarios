package edu.ues.sii.inventory_system.service;

import java.util.List;
import org.springframework.stereotype.Service;
import edu.ues.sii.inventory_system.dto.ProductoDTO;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo; }

    public List<ProductoDTO> listar() {
        return repo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public ProductoDTO guardar(ProductoDTO dto) {
        Producto p = new Producto();
        mapToEntity(dto, p);
        return toDTO(repo.save(p)); }

    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        mapToEntity(dto, p);
        return toDTO(repo.save(p)); }

    public void eliminar(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Producto no encontrado"); }
        repo.deleteById(id); }

    // MAPEO

    private ProductoDTO toDTO(Producto p) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setPrecio(p.getPrecio());
        dto.setStock(p.getStock());
        dto.setDescripcion(p.getDescripcion());
        return dto; }

    private void mapToEntity(ProductoDTO dto, Producto p) {
        p.setNombre(dto.getNombre());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        p.setDescripcion(dto.getDescripcion()); }
}