package org.oao.eticket.domain.port.outbound;

import org.oao.eticket.domain.application.model.User;

public interface CreateUserPort {
    User create(CreateUserCommand user);
}
