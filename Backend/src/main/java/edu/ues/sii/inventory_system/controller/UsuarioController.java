package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.*;
import edu.ues.sii.inventory_system.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios", description = "Gestión de usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    // CONSTRUCTOR CORRECTO
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService; }

    // LISTAR
    @GetMapping
    @Operation(summary = "Listar usuarios")
    public List<UsuarioDTO> listar() {
        return usuarioService.listar(); }

    // CREAR
    @PostMapping
    @Operation(summary = "Crear usuario")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioDTO crear(@RequestBody @Valid UsuarioCreateDTO dto) {
        return usuarioService.crearUsuario(dto); }

    //ACTUALIZAR
    @PutMapping("/{id}")
    public UsuarioDTO actualizar(@PathVariable Long id, @RequestBody UsuarioCreateDTO dto) {
        return usuarioService.actualizar(id, dto);
    }
    // ELIMINAR
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id); }
}