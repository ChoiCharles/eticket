package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.AccessTokenMetadata;
import org.oao.eticket.application.domain.model.AuthTokenId;
import org.oao.eticket.application.domain.model.User;

public interface LoadAccessTokenMetadataPort {
  AccessTokenMetadata load(LoadAccessTokenMetadataCommand cmd);
}
