package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.TransaccionDTO;
import edu.ues.sii.inventory_system.service.TransaccionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/transacciones")
@Tag(name = "Transacciones", description = "Gestión de Registro de Transacciones")
public class TransaccionController {
    @Autowired
    private TransaccionService service;

    @GetMapping
    public List<TransaccionDTO> listar(){
        return service.listar(); }

    @PostMapping
    public TransaccionDTO guardar(
            @Valid
            @RequestBody
            TransaccionDTO dto){
        return service.guardar(dto); }

    @PutMapping("/{id}")
    public TransaccionDTO actualizar(
            @PathVariable Long id,
            @Valid
            @RequestBody
            TransaccionDTO dto){
        return service.actualizar(id, dto); }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.eliminar(id); }
}
