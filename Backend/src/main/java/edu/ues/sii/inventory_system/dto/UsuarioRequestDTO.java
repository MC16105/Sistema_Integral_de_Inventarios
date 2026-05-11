package edu.ues.sii.inventory_system.dto;

import edu.ues.sii.inventory_system.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioRequestDTO {
    @NotBlank(message = "El username es obligatorio")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @Email(message = "Formato de email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    // PERMITIR EL ROL
    private Role role;

    // GETTERS Y SETTERS
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
}
