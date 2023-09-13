package org.oao.eticket.application.port.out;

import lombok.Value;
import org.oao.eticket.application.domain.model.AccessTokenMetadata;
import org.oao.eticket.application.domain.model.RefreshTokenMetadata;
import org.oao.eticket.application.domain.model.User;

import java.time.Duration;

@Value
public class SaveAuthTokenMetadataCommand {
  User.UserId ownerId;
  AccessTokenMetadata accessTokenMetadata;
  Duration accessTokenLifetime;
  RefreshTokenMetadata refreshTokenMetadata;
  Duration refreshTokenLifetime;
}
