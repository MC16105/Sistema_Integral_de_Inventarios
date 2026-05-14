package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.entity.Producto;
import edu.ues.sii.inventory_system.entity.Venta;
import edu.ues.sii.inventory_system.entity.VentaDetalle;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import edu.ues.sii.inventory_system.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Venta guardar(Venta venta) {

        double total = 0;

        for (VentaDetalle detalle : venta.getDetalles()) {

            Producto producto = detalle.getProducto();

            producto.setStock(producto.getStock() - detalle.getCantidad());

            productoRepository.save(producto);

            detalle.setVenta(venta);

            detalle.setSubtotal(detalle.getCantidad() * detalle.getPrecio());

            total += detalle.getSubtotal();
        }

        venta.setTotal(total);

        return ventaRepository.save(venta);
    }

    public List<Venta> listar() {
        return ventaRepository.findAll();
    }
}