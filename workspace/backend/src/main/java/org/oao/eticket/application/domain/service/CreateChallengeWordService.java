package org.oao.eticket.application.domain.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.oao.eticket.application.domain.model.User;
import org.oao.eticket.application.port.in.CreateChallengeWordUseCase;
import org.oao.eticket.application.port.out.SaveChallengeWordCommand;
import org.oao.eticket.application.port.out.SaveChallengeWordPort;
import org.oao.eticket.common.annotation.UseCase;

@UseCase
@RequiredArgsConstructor
public class CreateChallengeWordService implements CreateChallengeWordUseCase {

  private final SaveChallengeWordPort saveChallengeWordPort;

  @Override
  public String create(final User.UserId challenger) {
    final var challengeWord = RandomStringUtils.randomAlphanumeric(12);
    saveChallengeWordPort.save(new SaveChallengeWordCommand(challenger, challengeWord));
    return challengeWord;
  }
}
