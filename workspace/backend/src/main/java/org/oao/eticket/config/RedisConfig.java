package org.oao.eticket.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

  private RedisTemplate<String, String> createStringRedisTemplate(
      final RedisConnectionFactory connectionFactory) {
    final var redisTemplate = new RedisTemplate<String, String>();
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    redisTemplate.setValueSerializer(new StringRedisSerializer());
    redisTemplate.setHashKeySerializer(new StringRedisSerializer());
    redisTemplate.setHashValueSerializer(new StringRedisSerializer());
    redisTemplate.setConnectionFactory(connectionFactory);
    return redisTemplate;
  }

  @Bean("eticketAuthRedisConnectionFactory")
  RedisConnectionFactory eticketAuthRedisConnectionFactory(
      @Value("${eticket.redis.auth.host}") final String host,
      @Value("${eticket.redis.auth.port}") final int port,
      @Value("${eticket.redis.auth.database}") final String database) {
    final var connectionFactory = new LettuceConnectionFactory(host, port);
    connectionFactory.setDatabase(Integer.parseInt(database));
    return connectionFactory;
  }

  @Bean("eticketAuthRedisTemplate")
  RedisTemplate<String, String> eticketAuthRedisTemplate(
      final RedisConnectionFactory eticketAuthRedisConnectionFactory) {
    return createStringRedisTemplate(eticketAuthRedisConnectionFactory);
  }

  @Bean("eticketReservationRedisConnectionFactory")
  RedisConnectionFactory eticketReservationRedisConnectionFactory(
          @Value("${eticket.redis.auth.host}") final String host,
          @Value("${eticket.redis.auth.port}") final int port,
          @Value("${eticket.redis.auth.database}") final String database) {
    final var connectionFactory = new LettuceConnectionFactory(host, port);
    connectionFactory.setDatabase(Integer.parseInt(database));
    return connectionFactory;
  }

  @Bean("eticketReservationRedisTemplate")
  RedisTemplate<String, String> eticketReservationRedisTemplate(
          final RedisConnectionFactory eticketReservationRedisConnectionFactory) {
    return createStringRedisTemplate(eticketReservationRedisConnectionFactory);
  }
}
