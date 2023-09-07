package org.oao.eticket.domain.port.outbound;

import org.oao.eticket.domain.application.model.User;

public interface LoadUserPort {
    User loadById(User.UserId id);
}
