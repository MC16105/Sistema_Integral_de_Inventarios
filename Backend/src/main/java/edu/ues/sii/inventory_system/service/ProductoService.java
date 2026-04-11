package edu.ues.sii.inventory_system.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.ues.sii.inventory_system.dto.ProductoDTO;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repo;

    public List<ProductoDTO> listar(){
        return repo.findAll().stream().map(this::toDTO).toList();
    }

    public ProductoDTO guardar(ProductoDTO dto) {
        Producto p = toEntity(dto);
        p.setNombre(dto.getNombre());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        p.setDescripcion(dto.getDescripcion());
        return toDTO(repo.save(p));
    }

    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto p = repo.findById(id).orElseThrow();
        p.setNombre(dto.getNombre());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        p.setDescripcion(dto.getDescripcion());
        return toDTO(repo.save(p));
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    //MAPEO

    private ProductoDTO toDTO(Producto p) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setPrecio(p.getPrecio());
        dto.setStock(p.getStock());
        dto.setDescripcion(p.getDescripcion());
        return dto;
    }

    private Producto toEntity(ProductoDTO dto) {
        Producto p = new Producto();
        p.setNombre(dto.getNombre());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        p.setDescripcion(dto.getDescripcion());
        return p;
    }

}
