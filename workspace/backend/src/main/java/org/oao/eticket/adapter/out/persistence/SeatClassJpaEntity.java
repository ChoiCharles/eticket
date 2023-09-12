package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "seat_class")
public class SeatClassJpaEntity {
  // @EmbeddedId로 식별 관계 구성
  @EmbeddedId private SeatClassId id;

  @MapsId("performanceId") // SeatClassId.performanceId로 매핑
  @ManyToOne
  @JoinColumn(name = "performance_id")
  private PerformanceJpaEntity performance;

  @Column(nullable = false)
  @NotBlank
  private String className;

  @Column(nullable = false)
  @NotBlank
  private Integer price;
}
