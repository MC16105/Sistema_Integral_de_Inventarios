package edu.ues.sii.inventory_system.repository;

import edu.ues.sii.inventory_system.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> { }
