package org.oao.eticket.application.port.in;

import org.oao.eticket.application.domain.model.User;

public interface CreateChallengeWordUseCase {
  String create(User.UserId challenger);
}
