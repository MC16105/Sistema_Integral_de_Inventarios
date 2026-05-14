package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "proveedor")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String contacto;

    @Column(nullable = false, length = 20)
    private String telefono;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String direccion;

    @CreationTimestamp //AUTOMATICO DE HIBERNATE
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp //AUTOMATICO DE HIBERNATE
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // RELACIONES

    @OneToMany(mappedBy = "proveedor")
    private List<Producto> productos;

    //GETTER Y SETTER

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public String getNombre() {
        return nombre; }
    public void setNombre(String nombre) {
        this.nombre = nombre; }

    public String getContacto() {
        return contacto; }
    public void setContacto(String contacto) {
        this.contacto = contacto; }

    public String getTelefono() {
        return telefono; }
    public void setTelefono(String telefono) {
        this.telefono = telefono; }

    public String getEmail() {
        return email; }
    public void setEmail(String email) {
        this.email = email; }

    public String getDireccion() {
        return direccion; }
    public void setDireccion(String direccion) {
        this.direccion = direccion; }

    public LocalDateTime getCreatedAt() {
        return createdAt; } //SOLO GET

    public LocalDateTime getUpdatedAt() {
        return updatedAt; } //SOLO GET

}
