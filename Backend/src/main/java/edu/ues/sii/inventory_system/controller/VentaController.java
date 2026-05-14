package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.entity.Venta;
import edu.ues.sii.inventory_system.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ventas")
@CrossOrigin("*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping
    public Venta guardar(@RequestBody Venta venta) {
        return ventaService.guardar(venta);
    }

    @GetMapping
    public List<Venta> listar() {
        return ventaService.listar();
    }
    @GetMapping("/{id}")
    public Venta obtenerPorId(@PathVariable Long id) {
        return ventaService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public Venta editar(@PathVariable Long id, @RequestBody Venta venta) {
        return ventaService.editar(id, venta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        ventaService.eliminar(id);
    }
}
