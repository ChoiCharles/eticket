package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.User;

public interface LoadUserPort {
    User loadById(User.UserId id);
    User loadByUsername(String username);
}
