package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * EmbeddedId로  식별 관계를 구성
 */
@NoArgsConstructor
@Embeddable
public class SeatClassId implements Serializable {
  @Column(name = "seat_class_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String performanceId; // @MapsId("performanceId")로 매핑

  @Override
  public int hashCode() {
    return super.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    return super.equals(obj);
  }
}
