package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.MovimientoInventarioDTO;
import edu.ues.sii.inventory_system.service.MovimientoInventarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/movimientos")
@Tag(name = "Movimientos Inventario", description = "Gestión de movimientos de inventario")
public class MovimientoInventarioController {
    private final MovimientoInventarioService service;

    public MovimientoInventarioController(
            MovimientoInventarioService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar movimientos")
    public List<MovimientoInventarioDTO> listar() {
        return service.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear movimiento")
    public MovimientoInventarioDTO guardar(
            @RequestBody @Valid
            MovimientoInventarioDTO dto) {
        return service.guardar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar movimiento")
    public MovimientoInventarioDTO actualizar(
            @PathVariable Long id,
            @RequestBody @Valid
            MovimientoInventarioDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar movimiento")
    public void eliminar(
            @PathVariable Long id) {
        service.eliminar(id);
    }
}
