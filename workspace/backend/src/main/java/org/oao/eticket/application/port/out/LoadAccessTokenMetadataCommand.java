package org.oao.eticket.application.port.out;

import org.oao.eticket.application.domain.model.AuthTokenId;
import org.oao.eticket.application.domain.model.User;

public record LoadAccessTokenMetadataCommand(User.UserId ownerId, AuthTokenId accessTokenId) {}
