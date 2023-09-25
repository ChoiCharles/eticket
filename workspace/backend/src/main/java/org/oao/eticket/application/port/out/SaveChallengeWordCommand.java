package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.User;

public record SaveChallengeWordCommand(User.UserId challenger, String challengeWord) {}
