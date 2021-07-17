package com.controllers;

import com.model.Chat;
import com.model.EStatus;
import com.model.Order;
import com.model.User;
import com.repository.ChatRepository;
import com.repository.OrderRepository;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRepository chatRepository;

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_BOOSTER')")
    public List<Chat> getOrderById(@PathVariable Long orderId) throws Exception {
        return chatRepository.findAllByOrderIdOrderByChatTime(orderId);
    }

    @PostMapping("/send/{orderId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_BOOSTER')")
    public void createNewOrderByUserId(@RequestBody Chat chat) throws Exception {
        chatRepository.save(chat);
    }

}
