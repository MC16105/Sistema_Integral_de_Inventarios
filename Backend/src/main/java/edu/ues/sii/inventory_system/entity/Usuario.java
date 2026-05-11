package edu.ues.sii.inventory_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import edu.ues.sii.inventory_system.entity.Role;

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

        @Column(nullable = false)
        private String email;

        @Enumerated(EnumType.STRING)
        private Role role;

        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        @PrePersist
        public void prePersist() {
            createdAt = LocalDateTime.now();
            updatedAt = LocalDateTime.now(); }

        @PreUpdate
        public void preUpdate() {
            updatedAt = LocalDateTime.now(); }

        // GETTERS Y SETTERS
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public Role getRole() {
            return role; }
        public void setRole(Role role) {
            this.role = role; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
}
