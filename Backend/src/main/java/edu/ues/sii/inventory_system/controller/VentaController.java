package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.VentaCreateDTO;
import edu.ues.sii.inventory_system.dto.VentaDTO;
import edu.ues.sii.inventory_system.service.VentaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/ventas")
@Tag(name = "Ventas", description = "Operaciones relacionadas a ventas")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping
    public VentaDTO crear(@RequestBody VentaCreateDTO dto) {
        return ventaService.crear(dto);
    }

    @GetMapping
    public List<VentaDTO> listar() {
        return ventaService.listar();
    }

    @GetMapping("/{id}")
    public VentaDTO obtener(@PathVariable Long id) {
        return ventaService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        ventaService.eliminar(id);
    }}
