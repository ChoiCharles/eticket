package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.exception.ExternalServiceException;
import org.oao.eticket.exception.NoResultException;

public interface LoadChallengeWordPort {
  String load(User.UserId challenger) throws NoResultException, ExternalServiceException;
}
