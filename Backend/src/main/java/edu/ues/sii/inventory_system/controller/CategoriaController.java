package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.CategoriaDTO;
import edu.ues.sii.inventory_system.service.CategoriaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/categorias")
@Tag(name = "Categorias", description = "Gestión de categorías")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    @Operation(summary = "Listar categorías")
    public List<CategoriaDTO> listar() {
        return categoriaService.listar();
    }

    @PostMapping
    @Operation(summary = "Crear categoría")
    public CategoriaDTO guardar(@RequestBody CategoriaDTO dto) {
        return categoriaService.guardar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar categoría")
    public CategoriaDTO actualizar(@PathVariable Long id,
                                   @RequestBody CategoriaDTO dto) {
        return categoriaService.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoría")
    public void eliminar(@PathVariable Long id) {
        categoriaService.eliminar(id);
    }
}