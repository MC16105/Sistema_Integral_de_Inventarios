package edu.ues.sii.inventory_system.repository;

import edu.ues.sii.inventory_system.entity.AjusteInventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AjusteInventarioRepository
        extends JpaRepository<AjusteInventario, Long> {
}
