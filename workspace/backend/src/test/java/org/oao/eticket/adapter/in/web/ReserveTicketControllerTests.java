package org.oao.eticket.adapter.in.web;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.oao.eticket.application.domain.service.ReserveTicketService;
import org.oao.eticket.common.WebAdpaterTestsBase;
import org.oao.eticket.config.MainDatabaseContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

@ExtendWith(MainDatabaseContainer.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
class ReserveTicketControllerTests extends WebAdpaterTestsBase {

  private static final String TARGET_CONTROLLER = "ReserveTicketController";

  @MockBean ReserveTicketService reserveTicketService;

  @Autowired private ObjectMapper objectMapper;

  @Test
  @WithMockUser
  @DisplayName("유저 아이디, 공연 스케줄, 좌석이 존재하면, 티켓 예매에 성공한다.")
  void whenGood_ReservationBeCreated() throws Exception {
    final var DUMMY_RESERVATION = new ReserveTicketController.ReservationDetail(1, 1, 1, 98000);

    mockMvc
        .perform(
            post("/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(DUMMY_RESERVATION)))
        .andExpect(status().isCreated())
        .andDo(
            document(
                TARGET_CONTROLLER + "/main",
                requestFields(
                    fieldWithPath("userId").description("티켓을 구매하는 유저의 식별자"),
                    fieldWithPath("performanceScheduleId").description("예매할 공연 스케줄의  식별자"),
                    fieldWithPath("seatId").description("예매할 좌석의 식별자"),
                    fieldWithPath("paymentAmount").description("예매 가격"))));
  }
}
