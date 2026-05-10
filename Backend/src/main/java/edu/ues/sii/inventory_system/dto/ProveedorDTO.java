package edu.ues.sii.inventory_system.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

public class ProveedorDTO {
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Pattern(regexp = "^[\\p{L}0-9 ]+$", message = "El nombre contiene caracteres inválidos")
    @Schema(example = "-")
    private String nombre;

    @NotBlank(message = "El contacto es obligatorio")
    @Size(min = 2, max = 100, message = "El contacto debe tener entre 2 y 100 caracteres")
    @Schema(example = "-")
    private String contacto;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^[0-9+ -]+$", message = "Formato de teléfono inválido")
    @Schema(example = "-")
    private String telefono;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    @Schema(example = "-")
    private String email;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(min = 5, max = 255, message = "La dirección debe tener entre 5 y 255 caracteres")
    @Schema(example = "-")
    private String direccion;

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

}
