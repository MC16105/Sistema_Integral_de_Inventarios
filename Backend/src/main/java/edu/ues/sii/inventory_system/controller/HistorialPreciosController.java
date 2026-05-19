package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.HistorialPreciosDTO;
import edu.ues.sii.inventory_system.service.HistorialPreciosService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historial")
@Tag(name = "Historial", description = "Operaciones relacionadas a Historial de Precios")
public class HistorialPreciosController {
    @Autowired
    private HistorialPreciosService service;

    @GetMapping
    public List<HistorialPreciosDTO> listar(){
        return service.listar(); }

    @PostMapping
    public HistorialPreciosDTO guardar(
            @Valid
            @RequestBody
            HistorialPreciosDTO dto){
        return service.guardar(dto); }

    @PutMapping("/{id}")
    public HistorialPreciosDTO actualizar(
            @PathVariable Long id,
            @Valid
            @RequestBody
            HistorialPreciosDTO dto){
        return service.actualizar(id, dto); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminar(id); }
}