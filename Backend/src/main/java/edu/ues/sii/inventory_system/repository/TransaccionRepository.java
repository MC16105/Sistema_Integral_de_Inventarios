package edu.ues.sii.inventory_system.repository;

import edu.ues.sii.inventory_system.entity.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {
}
