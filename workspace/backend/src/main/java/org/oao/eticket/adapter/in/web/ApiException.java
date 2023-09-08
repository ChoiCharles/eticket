package org.oao.eticket.adapter.in.web;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final HttpStatus status;
    private final String summary;

    private ApiException(final HttpStatus status, final String summary, final String description, final Exception e) {
        super(description, e);
        this.status = status;
        this.summary = summary;
    }

    public static ApiExceptionBuilder builder() {
        return new ApiExceptionBuilder();
    }

    public static class ApiExceptionBuilder {
        private HttpStatus status;
        private String summary;
        private String description;
        private Exception cause;

        private ApiExceptionBuilder() {}

        public ApiExceptionBuilder withStatus(final HttpStatus status) {
            this.status = status;
            return this;
        }

        public ApiExceptionBuilder withSummary(final String summary) {
            this.summary = summary;
            return this;
        }

        public ApiExceptionBuilder withDescription(final String description) {
            this.description = description;
            return this;
        }

        public ApiExceptionBuilder withCause(final Exception e) {
            this.cause = e;
            return this;
        }

        public ApiException build() {
            return new ApiException(status, summary, description, cause);
        }
    }
}
