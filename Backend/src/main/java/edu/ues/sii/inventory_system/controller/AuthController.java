package edu.ues.sii.inventory_system.controller;

import edu.ues.sii.inventory_system.dto.*;
import edu.ues.sii.inventory_system.entity.Role;
import edu.ues.sii.inventory_system.entity.Usuario;
import edu.ues.sii.inventory_system.security.JwtUtil;
import edu.ues.sii.inventory_system.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTRO
    @PostMapping("/register")
    public UsuarioResponseDTO register(@RequestBody UsuarioRequestDTO dto) {

        Usuario user = new Usuario();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());

        // POR DEFECTO
        Role role = dto.getRole() != null ? dto.getRole() : Role.ROLE_USER;
        user.setRole(role);

        Usuario saved = usuarioService.save(user);

        UsuarioResponseDTO response = new UsuarioResponseDTO();
        response.setId(saved.getId());
        response.setUsername(saved.getUsername());
        response.setEmail(saved.getEmail());
        response.setRole(saved.getRole().name());
        response.setCreatedAt(saved.getCreatedAt());
        response.setUpdatedAt(saved.getUpdatedAt());

        return response;
    }

    // 🔹 LOGIN
    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody UsuarioRequestDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername(),
                        dto.getPassword() )
        );

        String token = jwtUtil.generateToken(dto.getUsername());
        return new AuthResponseDTO(token); }
}
