package edu.ues.sii.inventory_system.repository;

import edu.ues.sii.inventory_system.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> { }
