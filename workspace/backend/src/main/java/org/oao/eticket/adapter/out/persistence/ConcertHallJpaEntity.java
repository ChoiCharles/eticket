package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "concert_hall")
@IdClass(ConcertHallId.class)
public class ConcertHallJpaEntity {
  @Id
  @Column(name = "concert_hall_id")
  private Integer id;

  @Id
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "venue_id")
  private VenueJpaEntitiy venue;

  @Column(nullable = false)
  @NotBlank
  private String name;

  @Column
  private String hallWholeViewImage;

  @Column(nullable = false)
  @NotBlank
  private Integer seatCount;
}
