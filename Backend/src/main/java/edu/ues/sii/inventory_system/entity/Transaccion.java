package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Transaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoTransaccion;

    private Double monto;

    private LocalDate fechaTransaccion;

    @ManyToOne
    @JoinColumn(name = "venta_id")
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "compra_id")
    private Compra compra;

    // GETTERS Y SETTERS

    public Long getId() { return id; }

    public String getTipoTransaccion() {
        return tipoTransaccion; }
    public void setTipoTransaccion(String tipoTransaccion) {
        this.tipoTransaccion = tipoTransaccion; }

    public Double getMonto() {
        return monto; }
    public void setMonto(Double monto) {
        this.monto = monto; }

    public LocalDate getFechaTransaccion() {
        return fechaTransaccion; }
    public void setFechaTransaccion(LocalDate fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion; }

    public Venta getVenta() {
        return venta; }
    public void setVenta(Venta venta) {
        this.venta = venta; }

    public Compra getCompra() {
        return compra; }
    public void setCompra(Compra compra) {
        this.compra = compra; }
}