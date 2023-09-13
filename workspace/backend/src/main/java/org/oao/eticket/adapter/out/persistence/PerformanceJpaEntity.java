package org.oao.eticket.adapter.out.persistence;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.oao.eticket.application.domain.model.PerformanceGenre;

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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "venue_id")
  private VenueJpaEntitiy venue;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserJpaEntity host;

  @Builder
  public PerformanceJpaEntity(
      Integer id,
      String title,
      PerformanceGenre genre,
      String cast,
      String description,
      VenueJpaEntitiy venue,
      UserJpaEntity host) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.cast = cast;
    this.description = description;
    this.venue = venue;
    this.host = host;
  }
}
