package org.oao.eticket.infrastructure;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtTokenUtils {

  public static Boolean validate(String token, Integer userId, String key) {
    Integer userIdByToken = getUsername(token, key);
    return userIdByToken.equals(userId) && !isTokenExpired(token, key);
  }

  public static Claims extractAllClaims(String token, String key) {
    return Jwts.parserBuilder()
        .setSigningKey(getSigningKey(key))
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  public static Integer getUsername(String token, String key) {
    return extractAllClaims(token, key).get("userId", Integer.class);
  }

  private static Key getSigningKey(String secretKey) {
    byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public static Boolean isTokenExpired(String token, String key) {
    Date expiration = extractAllClaims(token, key).getExpiration();
    return expiration.before(new Date());
  }

  public static String generateAccessToken(Integer userId, String key, long expiredTimeMs) {
    return doGenerateToken(userId, expiredTimeMs, key);
  }

  private static String doGenerateToken(Integer userId, long expireTime, String key) {
    Claims claims = Jwts.claims();
    claims.put("userId", userId);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + expireTime))
        .signWith(getSigningKey(key), SignatureAlgorithm.HS256)
        .compact();
  }
}
