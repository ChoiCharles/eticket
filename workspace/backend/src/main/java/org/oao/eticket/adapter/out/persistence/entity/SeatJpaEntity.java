package org.oao.eticket.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "seat")
public class SeatJpaEntity {
  @Id
  @Column(name = "seat_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "section_id")
  private SectionJpaEntity sectionJpaEntity;

  @Column(name = "seat_row")
  private String row;

  @Column(name = "number")
  private String number;

  @Column(name = "position_x")
  private Integer positionX;

  @Column(name = "position_y")
  private Integer positionY;

  @Builder
  public SeatJpaEntity(
      Integer id,
      SectionJpaEntity sectionJpaEntity,
      String row,
      String number,
      Integer positionX,
      Integer positionY) {
    this.id = id;
    this.sectionJpaEntity = sectionJpaEntity;
    this.row = row;
    this.number = number;
    this.positionX = positionX;
    this.positionY = positionY;
  }
}
