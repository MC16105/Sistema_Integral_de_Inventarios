package edu.ues.sii.inventory_system.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "movimiento_inventario")
public class MovimientoInventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tipoMovimiento;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(nullable = false)
    private LocalDate fechaMovimiento;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public MovimientoInventario() { }

    // GETTERS Y SETTERS

    public Long getId() {
        return id; }

    public String getTipoMovimiento() {
        return tipoMovimiento; }
    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento; }

    public Integer getCantidad() {
        return cantidad; }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad; }

    public LocalDate getFechaMovimiento() {
        return fechaMovimiento; }
    public void setFechaMovimiento(LocalDate fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento; }

    public Producto getProducto() {
        return producto; }
    public void setProducto(Producto producto) {
        this.producto = producto; }

    public Usuario getUsuario() {
        return usuario; }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}