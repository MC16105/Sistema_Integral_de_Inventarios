package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class HistorialPrecios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double precioAnterior;

    private Double precioNuevo;

    private LocalDate fechaCambio;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    // GETTERS Y SETTERS

    public Long getId() { return id; }

    public Double getPrecioAnterior() {
        return precioAnterior; }
    public void setPrecioAnterior(Double precioAnterior) {
        this.precioAnterior = precioAnterior; }

    public Double getPrecioNuevo() {
        return precioNuevo; }
    public void setPrecioNuevo(Double precioNuevo) {
        this.precioNuevo = precioNuevo; }

    public LocalDate getFechaCambio() {
        return fechaCambio; }
    public void setFechaCambio(LocalDate fechaCambio) {
        this.fechaCambio = fechaCambio; }

    public Producto getProducto() {
        return producto;}
    public void setProducto(Producto producto) {
        this.producto = producto; }
}