package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    @CreationTimestamp
    private LocalDateTime created_at;

    @UpdateTimestamp
    private LocalDateTime updated_at;

    // RELACION CON PRODUCTO
    @OneToMany(mappedBy = "usuario")
    private List<Producto> productos;

    // ===== GETTERS Y SETTERS =====

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public String getUsername() {
        return username; }
    public void setUsername(String username) {
        this.username = username; }

    public String getPassword() {
        return password; }
    public void setPassword(String password) {
        this.password = password; }

    public String getEmail() {
        return email; }
    public void setEmail(String email) {
        this.email = email; }

    public Role getRole() {
        return role; }
    public void setRole(Role role) {
        this.role = role; }

    public LocalDateTime getCreated_at() {
        return created_at; }
    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at; }

    public LocalDateTime getUpdated_at() {
        return updated_at; }
    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at; }

    public List<Producto> getProductos() {
        return productos; }
    public void setProductos(List<Producto> productos) {
        this.productos = productos; }

}