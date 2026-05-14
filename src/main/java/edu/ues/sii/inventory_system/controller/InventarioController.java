package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.InventarioDTO;
import edu.ues.sii.inventory_system.service.InventarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventarios")
@Tag(name = "Inventarios", description = "Gestión de inventarios")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    @GetMapping
    @Operation(summary = "Listar inventarios")
    public List<InventarioDTO> listar() {
        return inventarioService.listar();
    }

    @PostMapping
    @Operation(summary = "Crear inventario")
    public InventarioDTO guardar(@RequestBody InventarioDTO dto) {
        return inventarioService.guardar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar inventario")
    public InventarioDTO actualizar(@PathVariable Long id,
                                    @RequestBody InventarioDTO dto) {
        return inventarioService.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar inventario")
    public void eliminar(@PathVariable Long id) {
        inventarioService.eliminar(id);
    }
}