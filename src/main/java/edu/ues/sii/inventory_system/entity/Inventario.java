package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "inventario")
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer stock;

    private String ubicacion;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    public Inventario() {
    }

    public Long getId() {
        return id;
    }

    public Integer getStock() {
        return stock;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}