package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.CategoriaDTO;
import edu.ues.sii.inventory_system.entity.Categoria;
import edu.ues.sii.inventory_system.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaDTO> listar() {
        return categoriaRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public CategoriaDTO guardar(CategoriaDTO dto) {
        Categoria categoria = convertirAEntidad(dto);
        Categoria guardada = categoriaRepository.save(categoria);
        return convertirADTO(guardada);
    }

    public CategoriaDTO actualizar(Long id, CategoriaDTO dto) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());

        Categoria actualizada = categoriaRepository.save(categoria);
        return convertirADTO(actualizada);
    }

    public void eliminar(Long id) {
        categoriaRepository.deleteById(id);
    }

    private CategoriaDTO convertirADTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        dto.setDescripcion(categoria.getDescripcion());
        return dto;
    }

    private Categoria convertirAEntidad(CategoriaDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        return categoria;
    }
}