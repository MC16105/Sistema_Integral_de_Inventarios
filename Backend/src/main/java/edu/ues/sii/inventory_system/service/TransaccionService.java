package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.entity.Compra;
import edu.ues.sii.inventory_system.entity.Transaccion;
import edu.ues.sii.inventory_system.entity.Venta;
import edu.ues.sii.inventory_system.repository.CompraRepository;
import edu.ues.sii.inventory_system.repository.TransaccionRepository;
import edu.ues.sii.inventory_system.repository.VentaRepository;
import edu.ues.sii.inventory_system.dto.TransaccionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransaccionService {
    @Autowired
    private TransaccionRepository repo;

    @Autowired
    private VentaRepository ventaRepo;

    @Autowired
    private CompraRepository compraRepo;

    public List<TransaccionDTO> listar(){
        return repo.findAll().stream().map(this::toDTO).toList(); }

    public TransaccionDTO guardar(TransaccionDTO dto){
        Transaccion t = toEntity(dto);
        return toDTO(repo.save(t)); }

    public TransaccionDTO actualizar(Long id, TransaccionDTO dto){
        Transaccion t = repo.findById(id).orElseThrow();
        t.setTipoTransaccion(dto.getTipoTransaccion());
        t.setMonto(dto.getMonto());
        t.setFechaTransaccion(dto.getFechaTransaccion());
        if(dto.getVentaId() != null){
            Venta venta = ventaRepo.findById(dto.getVentaId()).orElseThrow();
            t.setVenta(venta); }

        if(dto.getCompraId() != null){
            Compra compra = compraRepo.findById(dto.getCompraId()).orElseThrow();
            t.setCompra(compra); }
        return toDTO(repo.save(t)); }

    public void eliminar(Long id){
        repo.deleteById(id); }

    // MAPEO

    private TransaccionDTO toDTO(Transaccion t){
        TransaccionDTO dto = new TransaccionDTO();
        dto.setId(t.getId());
        dto.setTipoTransaccion(t.getTipoTransaccion());
        dto.setMonto(t.getMonto());
        dto.setFechaTransaccion(t.getFechaTransaccion());
        if(t.getVenta() != null){
            dto.setVentaId(t.getVenta().getId()); }
        if(t.getCompra() != null){ dto.setCompraId(t.getCompra().getId()); }
        return dto; }

    private Transaccion toEntity(TransaccionDTO dto){
        Transaccion t = new Transaccion();
        t.setTipoTransaccion(dto.getTipoTransaccion());
        t.setMonto(dto.getMonto());
        t.setFechaTransaccion(dto.getFechaTransaccion());
        if(dto.getVentaId() != null){
            Venta venta = ventaRepo.findById(dto.getVentaId()).orElseThrow();
            t.setVenta(venta); }
        if(dto.getCompraId() != null){
            Compra compra = compraRepo.findById(dto.getCompraId()).orElseThrow();
            t.setCompra(compra); }
        return t; }
}
