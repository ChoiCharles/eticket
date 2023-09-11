package org.oao.eticket.common.jackson.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.oao.eticket.application.domain.model.User;

import java.io.IOException;

public class UserIdSerializer extends JsonSerializer<User.UserId> {

  @Override
  public void serialize(
      final User.UserId value, final JsonGenerator gen, final SerializerProvider serializers)
      throws IOException {

    if (value == null) {
      gen.writeNull();
    } else {
      gen.writeString(value.toString());
    }
  }

  @Override
  public Class<User.UserId> handledType() {
    return User.UserId.class;
  }
}
