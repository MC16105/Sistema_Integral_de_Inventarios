package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 255)
    private String descripcion;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer stock;

    public Producto() { }

    //RELACIONES

    @ManyToOne
    @JoinColumn(name = "proveedor_id")
    private Proveedor proveedor;

    // RELACION CON USUARIO
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    //GETTER Y SETTER

    public Long getId() {
        return id; }
    public void setId(Long id) {
        this.id = id; }

    public String getNombre() {
        return nombre; }
    public void setNombre(String nombre) {
        this.nombre = nombre; }

    public String getDescripcion() {
        return descripcion; }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion; }

    public BigDecimal getPrecio() {
        return precio; }
    public void setPrecio(BigDecimal precio) {
        this.precio = precio; }

    public Integer getStock() {
        return stock; }
    public void setStock(Integer stock) {
        this.stock = stock; }

}
