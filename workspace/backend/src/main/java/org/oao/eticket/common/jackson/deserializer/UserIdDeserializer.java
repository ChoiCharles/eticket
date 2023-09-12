package org.oao.eticket.common.jackson.deserializer;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.oao.eticket.application.domain.model.User;

import java.io.IOException;

public class UserIdDeserializer extends JsonDeserializer<User.UserId> {
  @Override
  public User.UserId deserialize(final JsonParser jsonParser, final DeserializationContext context)
      throws IOException {
    final var value = jsonParser.readValueAs(Integer.class);
    return User.UserId.of(value);
  }
}
