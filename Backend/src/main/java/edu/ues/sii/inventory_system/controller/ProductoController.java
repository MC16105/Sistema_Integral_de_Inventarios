package edu.ues.sii.inventory_system.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import edu.ues.sii.inventory_system.dto.ProductoDTO;
import edu.ues.sii.inventory_system.service.ProductoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/productos")
@Tag(name = "Productos", description = "Gestión de productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService; }

    @GetMapping
    @Operation(summary = "Listar productos")
    public List<ProductoDTO> listar() {
        return productoService.listar(); }

    @PostMapping
    @Operation(summary = "Crear producto")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductoDTO crear(@RequestBody @Valid ProductoDTO dto) {
        return productoService.guardar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto")
    public ProductoDTO actualizar(@PathVariable Long id, @RequestBody @Valid ProductoDTO dto) {
        return productoService.actualizar(id, dto); }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
    }
}
