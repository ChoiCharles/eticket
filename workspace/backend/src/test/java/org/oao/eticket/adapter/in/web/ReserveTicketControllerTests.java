package org.oao.eticket.adapter.in.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.oao.eticket.application.domain.service.ReserveTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ReserveTicketControllerTests {

  @Autowired private MockMvc mockMvc;

  @MockBean ReserveTicketService reserveTicketService;

  @Autowired private ObjectMapper objectMapper;

  @Test
  @WithMockUser
  @DisplayName("유저아이디, 공연스케줄, 좌석이 존재하면, 티켓 예매에 성공한다.")
  void whenGood_ReservationBeCreated() throws Exception {
    mockMvc
        .perform(
            post("/reservations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    objectMapper.writeValueAsBytes(
                        new ReserveTicketController.ReservationDetail(1, 1, 1, 98000))))
        .andDo(print())
        .andExpect(status().isCreated());
  }
}
