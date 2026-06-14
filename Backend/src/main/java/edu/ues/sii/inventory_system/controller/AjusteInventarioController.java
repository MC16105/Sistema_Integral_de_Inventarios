package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.AjusteInventarioDTO;
import edu.ues.sii.inventory_system.service.AjusteInventarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ajustes")
@Tag(name = "Ajustes Inventario", description = "Gestión de ajustes de inventario")
public class AjusteInventarioController {
    private final AjusteInventarioService service;

    public AjusteInventarioController(AjusteInventarioService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar ajustes")
    public List<AjusteInventarioDTO> listar() {
        return service.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear ajuste")
    public AjusteInventarioDTO guardar(
            @RequestBody @Valid
            AjusteInventarioDTO dto) {
        return service.guardar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar ajuste")
    public AjusteInventarioDTO actualizar(
            @PathVariable Long id,
            @RequestBody @Valid
            AjusteInventarioDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar ajuste")
    public void eliminar(
            @PathVariable Long id) {
        service.eliminar(id);
    }
}