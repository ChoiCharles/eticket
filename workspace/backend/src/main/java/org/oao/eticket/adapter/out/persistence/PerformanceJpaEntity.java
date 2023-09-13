package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.oao.eticket.application.domain.model.PerformanceGenre;
import org.oao.eticket.application.domain.model.PerformanceSchedule;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "performance")
public class PerformanceJpaEntity {
  @Id
  @Column(name = "performance_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  @NotBlank
  private String title;

  @Column(nullable = false)
  @NotNull
  @Convert(converter = PerformanceGenreConverter.class)
  private PerformanceGenre genre;

  @Column private String cast;

  @Column private String description;

  @Column private String posterImagePath;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "venue_id")
  private VenueJpaEntitiy venueJpaEntitiy;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserJpaEntity hostJpaEntity;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "performanceJpaEntity")
  private List<SeatClassJpaEntity> seatClassList; // 양방향

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "performanceJpaEntity")
  private List<PerformanceScheduleJpaEntity> performanceScheduleList; // 양방향

  @Builder
  public PerformanceJpaEntity(
      Integer id,
      String title,
      PerformanceGenre genre,
      String cast,
      String description,
      String posterImagePath,
      VenueJpaEntitiy venueJpaEntitiy,
      UserJpaEntity hostJpaEntity,
      List<SeatClassJpaEntity> seatClassList,
      List<PerformanceScheduleJpaEntity> performanceScheduleList) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.cast = cast;
    this.description = description;
    this.posterImagePath = posterImagePath;
    this.venueJpaEntitiy = venueJpaEntitiy;
    this.hostJpaEntity = hostJpaEntity;
    this.seatClassList = seatClassList;
    this.performanceScheduleList = performanceScheduleList;
  }
}
