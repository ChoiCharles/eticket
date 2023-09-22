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

  @Value("${eticket.redis.waiting.host}")
  private String host;

  @Value("${eticket.redis.waiting.port}")
  private int port;

  @Value("${eticket.redis.waiting.database}")
  private String waiting;

  @Value("${eticket.redis.ticketing.database}")
  private String ticketing;

  @Bean
  public RedisConnectionFactory redisConnectionFactory3() {
    final var connectionFactory = new LettuceConnectionFactory(host, port);
    connectionFactory.setDatabase(Integer.parseInt(waiting));
    return connectionFactory;
  }

  @Bean
  public RedisConnectionFactory redisConnectionFactory4() {
    final var connectionFactory = new LettuceConnectionFactory(host, port);
    connectionFactory.setDatabase(Integer.parseInt(ticketing));
    return connectionFactory;
  }

  @Bean
  public RedisTemplate<String, Integer> waitingStorage() {
    RedisTemplate<String, Integer> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory3());
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    return redisTemplate;
  }

  @Bean
  public RedisTemplate<String, Integer> ticketingStorage() {
    RedisTemplate<String, Integer> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory4());
    redisTemplate.setKeySerializer(new StringRedisSerializer());
    return redisTemplate;
  }
}
