package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.entity.Compra;
import edu.ues.sii.inventory_system.entity.CompraDetalle;
import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.repository.CompraRepository;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Compra guardar(Compra compra) {

        double total = 0;

        for (CompraDetalle detalle : compra.getDetalles()) {

            Producto producto = detalle.getProducto();

            producto.setStock(producto.getStock() + detalle.getCantidad());

            productoRepository.save(producto);

            detalle.setCompra(compra);

            detalle.setSubtotal(detalle.getCantidad() * detalle.getPrecio());

            total += detalle.getSubtotal();
        }

        compra.setTotal(total);

        return compraRepository.save(compra);
    }

    public List<Compra> listar() {
        return compraRepository.findAll();
    }
}