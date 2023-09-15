package org.oao.eticket.adapter.out.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "seat_class")
public class SeatClassJpaEntity {
  @Id
  @Column(name = "seat_class_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  @NotBlank
  private String className;

  @Column(nullable = false)
  @NotBlank
  private Integer price;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "performance_id")
  private PerformanceJpaEntity performanceJpaEntity;

  @Builder
  public SeatClassJpaEntity(
      Integer id, String className, Integer price, PerformanceJpaEntity performanceJpaEntity) {
    this.id = id;
    this.className = className;
    this.price = price;
    this.performanceJpaEntity = performanceJpaEntity;
  }
}
