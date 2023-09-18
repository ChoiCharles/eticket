package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.User;

public interface CreateUserPort {
  User create(CreateUserCommand user);
}
