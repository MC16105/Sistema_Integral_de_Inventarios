package edu.ues.sii.inventory_system.repository;

import edu.ues.sii.inventory_system.entity.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Long> {
}
