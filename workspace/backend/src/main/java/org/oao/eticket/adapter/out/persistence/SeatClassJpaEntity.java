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
  private PerformanceJpaEntity performance;
}
