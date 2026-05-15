package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.UsuarioCreateDTO;
import edu.ues.sii.inventory_system.dto.UsuarioDTO;
import edu.ues.sii.inventory_system.entity.Role;
import edu.ues.sii.inventory_system.entity.Usuario;
import edu.ues.sii.inventory_system.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CREATE (DTO → ENTITY)
    public UsuarioDTO crearUsuario(UsuarioCreateDTO dto) {
        Usuario user = new Usuario();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setRole(Role.valueOf(dto.getRole().toUpperCase()));
        Usuario guardado = usuarioRepository.save(user);
        return toDTO(guardado); }

    // LIST (ENTITY → DTO)
    public List<UsuarioDTO> listar() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList(); }

    // UPDATE
    public UsuarioDTO actualizar(Long id, UsuarioCreateDTO dto) {
        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        // Solo actualiza password si viene
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword())); }
        user.setRole(Role.valueOf(dto.getRole().toUpperCase()));
        Usuario actualizado = usuarioRepository.save(user);
        return toDTO(actualizado); }

    // DELETE
    public void eliminar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado"); }
        usuarioRepository.deleteById(id); }

    // MAPEO ENTITY → DTO
    private UsuarioDTO toDTO(Usuario user) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        return dto; }
}