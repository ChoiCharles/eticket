package org.oao.eticket.application.port.in.dto;

import lombok.Value;
import org.oao.eticket.application.domain.model.User;

@Value
public class RegisterWalletCommand {
  User.UserId userId;
  String personalSign;
  String walletAddress;
}
