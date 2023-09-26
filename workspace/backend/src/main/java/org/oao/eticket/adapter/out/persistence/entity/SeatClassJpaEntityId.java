package org.oao.eticket.adapter.out.persistence.entity;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
public class SeatClassJpaEntityId implements Serializable {
    private Integer id;
    private Integer performanceJpaEntity;
}
