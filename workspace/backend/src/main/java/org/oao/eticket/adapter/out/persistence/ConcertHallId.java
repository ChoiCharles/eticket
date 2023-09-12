package org.oao.eticket.adapter.out.persistence;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/** 식별 관계 매핑을 위해 복합키를 만들기 위해서 Id Class 생성 */
@Getter
@NoArgsConstructor
public class ConcertHallId implements Serializable {
  private Integer id;
  private VenueJpaEntitiy venue;

  @Override
  public int hashCode() {
    return super.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    return super.equals(obj);
  }
}
