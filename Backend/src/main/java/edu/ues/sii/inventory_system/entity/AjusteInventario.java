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
@Table(name = "ajuste_inventario")
public class AjusteInventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer cantidadAjustada;

    @Column(nullable = false, length = 255)
    private String motivoAjuste;

    @Column(nullable = false)
    private LocalDate fechaAjuste;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public AjusteInventario() { }

    // GETTERS Y SETTERS

    public Long getId() {
        return id;
    }

    public Integer getCantidadAjustada() {
        return cantidadAjustada; }
    public void setCantidadAjustada(Integer cantidadAjustada) {
        this.cantidadAjustada = cantidadAjustada; }

    public String getMotivoAjuste() {
        return motivoAjuste; }
    public void setMotivoAjuste(String motivoAjuste) {
        this.motivoAjuste = motivoAjuste; }

    public LocalDate getFechaAjuste() {
        return fechaAjuste; }
    public void setFechaAjuste(LocalDate fechaAjuste) {
        this.fechaAjuste = fechaAjuste; }

    public Producto getProducto() {
        return producto; }
    public void setProducto(Producto producto) {
        this.producto = producto; }

    public Usuario getUsuario() {
        return usuario; }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario; }
}