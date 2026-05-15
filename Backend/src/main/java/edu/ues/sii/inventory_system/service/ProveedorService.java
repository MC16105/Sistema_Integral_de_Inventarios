package edu.ues.sii.inventory_system.service;

import edu.ues.sii.inventory_system.dto.ProveedorDTO;
import edu.ues.sii.inventory_system.entity.Proveedor;
import edu.ues.sii.inventory_system.repository.ProveedorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProveedorService {
    private final ProveedorRepository repo;

    public ProveedorService(ProveedorRepository repo) {
        this.repo = repo; }

    public List<ProveedorDTO> listar() {
        return repo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public ProveedorDTO guardar(ProveedorDTO dto) {
        Proveedor proveedor = new Proveedor();
        mapToEntity(dto, proveedor);
        return toDTO(repo.save(proveedor)); }

    public ProveedorDTO actualizar(Long id, ProveedorDTO dto) {
        Proveedor proveedor = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
        mapToEntity(dto, proveedor);
        return toDTO(repo.save(proveedor)); }

    public void eliminar(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Proveedor no encontrado"); }
        repo.deleteById(id); }

    // MAPEO

    private ProveedorDTO toDTO(Proveedor proveedor) {
        ProveedorDTO dto = new ProveedorDTO();
        dto.setId(proveedor.getId());
        dto.setNombre(proveedor.getNombre());
        dto.setContacto(proveedor.getContacto());
        dto.setTelefono(proveedor.getTelefono());
        dto.setEmail(proveedor.getEmail());
        dto.setDireccion(proveedor.getDireccion());
        return dto; }

    private void mapToEntity(ProveedorDTO dto, Proveedor proveedor) {
        proveedor.setNombre(dto.getNombre());
        proveedor.setContacto(dto.getContacto());
        proveedor.setTelefono(dto.getTelefono());
        proveedor.setEmail(dto.getEmail());
        proveedor.setDireccion(dto.getDireccion()); }
}