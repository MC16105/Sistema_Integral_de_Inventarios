package edu.ues.sii.inventory_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import edu.ues.sii.inventory_system.dto.ProductoDTO;
import edu.ues.sii.inventory_system.service.ProductoService;

@RestController
@RequestMapping("/productos")
@Tag(name = "Productos", description = "Gestión de productos")
public class ProductoController {
    @Autowired
    private ProductoService service;

    @GetMapping
    @Operation(summary = "Listar productos")
    public List<ProductoDTO> listar() {
        return service.listar();
    }

    @PostMapping
    @Operation(summary = "Crear producto")
    public ProductoDTO crear(@RequestBody ProductoDTO dto) {
        return service.guardar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto")
    public ProductoDTO actualizar(@PathVariable Long id, @RequestBody ProductoDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
