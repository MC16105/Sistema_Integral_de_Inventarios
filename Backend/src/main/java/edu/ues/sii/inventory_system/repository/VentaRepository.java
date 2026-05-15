package edu.ues.sii.inventory_system.repository;

import edu.ues.sii.inventory_system.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository extends JpaRepository<Venta, Long> { }