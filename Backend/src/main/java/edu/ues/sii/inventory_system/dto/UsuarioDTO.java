package edu.ues.sii.inventory_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioDTO {
    private Long id;

    @NotBlank(message = "El username es obligatorio")
    private String username;

    @Email(message = "Formato de email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    private String role;

    // Getters y Setters

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public String getUsername() {
        return username; }
    public void setUsername(String username) {
        this.username = username; }

    public String getEmail() {
        return email; }
    public void setEmail(String email) {
        this.email = email; }

    public String getRole() {
        return role; }
    public void setRole(String role) {
        this.role = role; }
}
