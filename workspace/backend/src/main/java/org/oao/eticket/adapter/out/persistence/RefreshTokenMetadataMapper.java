package org.oao.eticket.adapter.out.persistence;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.oao.eticket.application.port.out.SaveAuthTokenMetadataCommand;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
interface RefreshTokenMetadataMapper {
  @Mapping(target = "signature", source = "refreshTokenMetadata.signature")
  @Mapping(target = "accessTokenId", source = "refreshTokenMetadata.accessTokenId")
  @Mapping(target = "accessTokenSignature", source = "refreshTokenMetadata.signature")
  RefreshTokenMetadataRedisEntity mapToRedisEntity(SaveAuthTokenMetadataCommand cmd);
}
