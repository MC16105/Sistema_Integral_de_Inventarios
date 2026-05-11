package edu.ues.sii.inventory_system.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY =
            "mi_clave_secreta_super_segura_de_32_bytes_minimo";

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // GENERAR TOKEN
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60) )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // EXTRAER USERNAME
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    /* método reutilizable (mejor práctica) */

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // OPCIONAL
    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true; }
        catch (JwtException e) {
            return false; }
    }

    public boolean validateToken(String token, String username) {
        return false;
    }
}