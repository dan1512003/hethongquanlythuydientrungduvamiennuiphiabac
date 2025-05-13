package com.example.demo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class JwtTokenProvider {

    private String secretKey = "mysupersecurejwtsecretwithatleast32chars!";
   byte[] keyBytes = this.secretKey.getBytes(StandardCharsets.UTF_8);
   Key key=Keys.hmacShaKeyFor(keyBytes);
    private final long validityInMilliseconds = 3600000; 

    public String createToken(String username) {
          return Jwts.builder()
      .subject(username)
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + validityInMilliseconds))
      .signWith(key)
      .compact();
     
    }

    // 
    // public String getUsernameFromToken(String token) {
    //     Claims claims = Jwts.parserBuilder()
    //             .setSigningKey(secretKey.getBytes())
    //             .build()
    //             .parseClaimsJws(token)
    //             .getBody();
    //     return claims.getSubject();
    // }

    //
    // public boolean isTokenExpired(String token) {
    //     return getExpirationDateFromToken(token).before(new Date());
    // }

    //
    // private Date getExpirationDateFromToken(String token) {
    //     Claims claims = Jwts.parserBuilder()
    //             .setSigningKey(secretKey.getBytes())
    //             .build()
    //             .parseClaimsJws(token)
    //             .getBody();
    //     return claims.getExpiration();
    // }

    // 
    // public boolean validateToken(String token) {
    //     try {
    //         Jwts.parserBuilder()
    //             .setSigningKey(secretKey.getBytes())
    //             .build()
    //             .parseClaimsJws(token);  
    //         return true;
    //     } catch (Exception e) {
    //         return false;
    //     }
    // }
}
