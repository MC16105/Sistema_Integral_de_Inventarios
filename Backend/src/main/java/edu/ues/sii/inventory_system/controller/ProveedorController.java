package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.ProveedorDTO;
import edu.ues.sii.inventory_system.service.ProveedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proveedores")
@Tag(name = "Proveedores", description = "Gestión de proveedores")
public class ProveedorController {
    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService; }

    @GetMapping
    @Operation(summary = "Listar proveedores")
    public List<ProveedorDTO> listar() {
        return proveedorService.listar(); }

    @PostMapping
    @Operation(summary = "Crear proveedor")
    @ResponseStatus(HttpStatus.CREATED)
    public ProveedorDTO crear(@RequestBody @Valid ProveedorDTO dto) {
        return proveedorService.guardar(dto); }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar proveedor")
    public ProveedorDTO actualizar(@PathVariable Long id, @RequestBody @Valid ProveedorDTO dto) {
        return proveedorService.actualizar(id, dto); }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar proveedor")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        proveedorService.eliminar(id); }
}