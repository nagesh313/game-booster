package com.controllers;

import com.model.EStatus;
import com.model.Order;
import com.model.User;
import com.payload.request.LoginRequest;
import com.payload.request.SignupRequest;
import com.payload.response.BoosterMetric;
import com.payload.response.JwtResponse;
import com.payload.response.MessageResponse;
import com.repository.OrderRepository;
import com.repository.UserRepository;
import com.security.jwt.JwtUtils;
import com.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/revenue")
public class MetricsController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_BOOSTER')")
    public BoosterMetric total(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            BoosterMetric result = new BoosterMetric();

            List<Order> allOrders = orderRepository.findAllByAssignedToAndStatus(user.get(), EStatus.FINISHED);
            Double totalRevenue = allOrders.stream().filter(order -> order.isPaid())
                    .map(x -> x.getBoosterAmount())
                    .reduce(0.00, Double::sum);
            Double pendingRevenue = allOrders.stream().filter(order -> !order.isPaid())
                    .map(x -> x.getBoosterAmount())
                    .reduce(0.00, Double::sum);
            result.setPendingRevenue(pendingRevenue);
            result.setTotalRevenue(totalRevenue);
            return result;
        } else {
            throw new Exception("User not found");
        }
    }

    @GetMapping("/percentage/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_BOOSTER')")
    public Double boosterPercentage(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getPercentage();
        } else {
            return 0.00;
        }
    }


}
