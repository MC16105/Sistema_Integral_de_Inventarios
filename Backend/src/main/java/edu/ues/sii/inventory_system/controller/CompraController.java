package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.CompraCreateDTO;
import edu.ues.sii.inventory_system.dto.CompraDTO;
import edu.ues.sii.inventory_system.service.CompraService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
@Tag(name = "Compras", description = "Operaciones relacionadas a compras")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PostMapping
    public CompraDTO crear(@RequestBody CompraCreateDTO dto) {
        return compraService.crear(dto);
    }

    @GetMapping
    public List<CompraDTO> listar() {
        return compraService.listar();
    }

    @GetMapping("/{id}")
    public CompraDTO obtenerPorId(@PathVariable Long id) {
        return compraService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        compraService.eliminar(id);
    }
}