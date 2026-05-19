package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.HistorialPreciosDTO;
import edu.ues.sii.inventory_system.repository.HistorialPreciosRepository;
import edu.ues.sii.inventory_system.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.ues.sii.inventory_system.entity.HistorialPrecios;
import edu.ues.sii.inventory_system.entity.Producto;
import java.util.List;

@Service
public class HistorialPreciosService {
    @Autowired
    private HistorialPreciosRepository repo;

    @Autowired
    private ProductoRepository productoRepo;

    public List<HistorialPreciosDTO> listar() {
        return repo.findAll().stream().map(this::toDTO).toList(); }

    public HistorialPreciosDTO guardar(HistorialPreciosDTO dto){
        HistorialPrecios h = toEntity(dto);
        return toDTO(repo.save(h)); }

    public HistorialPreciosDTO actualizar(Long id, HistorialPreciosDTO dto){
        HistorialPrecios h = repo.findById(id).orElseThrow();
        Producto producto = productoRepo.findById(dto.getProductoId()).orElseThrow();
        h.setProducto(producto);
        h.setPrecioAnterior(dto.getPrecioAnterior());
        h.setPrecioNuevo(dto.getPrecioNuevo());
        h.setFechaCambio(dto.getFechaCambio());
        return toDTO(repo.save(h)); }

    public void eliminar(Long id){
        repo.deleteById(id); }

    // MAPEO

    private HistorialPreciosDTO toDTO(HistorialPrecios h){
        HistorialPreciosDTO dto = new HistorialPreciosDTO();
        dto.setId(h.getId());
        dto.setProductoId(h.getProducto().getId());
        dto.setPrecioAnterior(h.getPrecioAnterior());
        dto.setPrecioNuevo(h.getPrecioNuevo());
        dto.setFechaCambio(h.getFechaCambio());
        return dto; }

    private HistorialPrecios toEntity(HistorialPreciosDTO dto){
        HistorialPrecios h = new HistorialPrecios();
        Producto producto = productoRepo.findById(dto.getProductoId()).orElseThrow();
        h.setProducto(producto);
        h.setPrecioAnterior(dto.getPrecioAnterior());
        h.setPrecioNuevo(dto.getPrecioNuevo());
        h.setFechaCambio(dto.getFechaCambio());
        return h; }
}
