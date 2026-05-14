package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.entity.Compra;
import edu.ues.sii.inventory_system.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
@CrossOrigin("*")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @PostMapping
    public Compra guardar(@RequestBody Compra compra) {
        return compraService.guardar(compra);
    }

    @GetMapping
    public List<Compra> listar() {
        return compraService.listar();
    }
    @GetMapping("/{id}")
public Compra obtenerPorId(@PathVariable Long id) {
    return compraService.obtenerPorId(id);
}

@PutMapping("/{id}")
public Compra editar(@PathVariable Long id, @RequestBody Compra compra) {
    return compraService.editar(id, compra);
}

@DeleteMapping("/{id}")
public void eliminar(@PathVariable Long id) {
    compraService.eliminar(id);
}
}