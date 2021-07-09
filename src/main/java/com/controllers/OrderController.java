package com.controllers;

import com.model.EStatus;
import com.model.Order;
import com.model.User;
import com.repository.OrderRepository;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_BOOSTER')")
    public Order getOrderById(@PathVariable Long orderId) throws Exception {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            return order.get();
        } else {
            throw new Exception("Order Not Found");
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Order> allOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/running")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Order> runningOrders() {
        return orderRepository.findAllByStatus(EStatus.ORDER_RUNNING);
    }

    @GetMapping("/finished")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Order> finishedOrders() {
        return orderRepository.findAllByStatus(EStatus.ORDER_FINISHED);
    }

    @GetMapping("/new")
    public List<Order> newOrders() {
        return orderRepository.findAllByStatus(EStatus.ORDER_NEW);
    }


    @GetMapping("/user/{userId}")
    public List<Order> getAllOrderByUserId(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return orderRepository.findAllByUser(user.get());
        }
        return Arrays.asList();
    }

    @PatchMapping("/pause/{userId}/{orderId}")
    public void pauseOrder(@PathVariable Long userId, @PathVariable Long orderId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        Optional<Order> order = orderRepository.findById(orderId);
        if (user.isPresent() && user.isPresent()) {
            Order orderToPause = order.get();
            orderToPause.setStatus(EStatus.ORDER_PAUSED);
            orderRepository.save(orderToPause);
        } else {
            throw new Exception("Order or User not found");
        }
    }

    @PatchMapping("/resume/{userId}/{orderId}")
    public void resumeOrder(@PathVariable Long userId, @PathVariable Long orderId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        Optional<Order> order = orderRepository.findById(orderId);
        if (user.isPresent() && user.isPresent()) {
            Order orderToResume = order.get();
            orderToResume.setStatus(EStatus.ORDER_RUNNING);
            orderRepository.save(orderToResume);
        } else {
            throw new Exception("Order or User not found");
        }
    }

//    @PostMapping("/create")
//    @PreAuthorize("hasRole('ADMIN')")
//    public void createNewOrder(@RequestBody AdminOrder order) throws Exception {
//        Optional<User> user = userRepository.findByUsername(order.getUsername());
//        if (user.isPresent()) {
//            Order order = new Order();
//            order.setUser(user.get());
//            order.setCreatedDate(new Date().toString());
//            order.setStatus(EStatus.ORDER_NEW);
//            order.setUser(user.get());
//            orderRepository.save(order);
//        } else {
//            throw new Exception("Invalid Request");
//        }
//    }

    @PostMapping("/create/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public void createNewOrderByUserId(@RequestBody Order order, @PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            order.setStatus(EStatus.ORDER_NEW);
            LocalDate currentDate = LocalDate.now();
            String date = currentDate.getMonth().toString() + " " + currentDate.getDayOfMonth() + ", " + currentDate.getYear();
            order.setCreatedDate(date);
            order.setUser(user.get());
            orderRepository.save(order);
        } else {
            throw new Exception("Invalid Request");
        }
    }

    @PostMapping("/admin/create/{userId}/{boosterId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void createNewOrderByUserId(
            @RequestBody Order order, @PathVariable Long userId, @PathVariable Long boosterId) throws Exception {
        Optional<User> forBooster = userRepository.findById(boosterId);
        Optional<User> forUser = userRepository.findById(userId);
        if (!forUser.isPresent()) {
            throw new Exception("Please select for which user this order is for!");
        } else {
            order.setStatus(EStatus.ORDER_RUNNING);
            LocalDate currentDate = LocalDate.now();
            String date = currentDate.getMonth().toString() + " " + currentDate.getDayOfMonth() + ", " + currentDate.getYear();
            order.setCreatedDate(date);
            order.setUser(forUser.get());
            if (forBooster.isPresent()) {
                order.setAssignedTo(forBooster.get());
            }
            orderRepository.save(order);
        }
    }

    @GetMapping("/admin/paid/{orderId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void markAmountPaidToBoosterForOrder(@PathVariable Long orderId) throws Exception {
        Optional<Order> orderToMarkComplete = orderRepository.findById(orderId);
        if (orderToMarkComplete.isPresent()) {
            Order order = orderToMarkComplete.get();
            order.setPaid(true);
            orderRepository.save(order);
        } else {
            throw new Exception("Order Not Present");
        }
    }

    @GetMapping("/booster/running/{userId}")
    @PreAuthorize("hasRole('ROLE_BOOSTER') or hasRole('ROLE_ADMIN')")
    public List<Order> getBoosterRunningOrders(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User booster = user.get();
            return orderRepository.findAllByAssignedToAndStatus(booster, EStatus.ORDER_RUNNING);
        } else {
            throw new Exception("Invalid User");
        }
    }

    @GetMapping("/booster/completed/{userId}")
    @PreAuthorize("hasRole('ROLE_BOOSTER') or hasRole('ROLE_ADMIN')")
    public List<Order> getBoosterCompletedOrders(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User booster = user.get();
            return orderRepository.findAllByAssignedToAndStatus(booster, EStatus.ORDER_FINISHED);
        } else {
            throw new Exception("Invalid User");
        }
    }

    @PatchMapping("/take/{boosterId}/{orderId}")
    @PreAuthorize("hasRole('ROLE_BOOSTER') or hasRole('ROLE_ADMIN')")
    public void assignOrderToBooster(@PathVariable Long boosterId, @PathVariable Long orderId) throws Exception {
        Optional<User> booster = userRepository.findById(boosterId);
        Optional<Order> order = orderRepository.findById(orderId);
        if (booster.isPresent()) {
            if (booster.isPresent()) {
                Order orderToAssign = order.get();
                if (orderToAssign.getUser() != null) {
                } else {
                    throw new Exception("Order is already Assigned");
                }
                orderToAssign.setStatus(EStatus.ORDER_RUNNING);
                orderToAssign.setAssignedTo(booster.get());
                orderRepository.save(orderToAssign);
            } else {
                throw new Exception("Invalid Order");
            }
        } else {
            throw new Exception("Invalid User");
        }
    }

    @PatchMapping("/complete/{orderId}")
    @PreAuthorize("hasRole('ROLE_BOOSTER') or hasRole('ROLE_ADMIN')")
    public void completeOrder(@PathVariable Long orderId) throws Exception {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            Order orderToComplete = order.get();
            orderToComplete.setStatus(EStatus.ORDER_FINISHED);
            LocalDate currentDate = LocalDate.now();
            String date = currentDate.getMonth().toString() + " " + currentDate.getDayOfMonth() + ", " + currentDate.getYear();
            orderToComplete.setCompletionDate(date);
            orderRepository.save(orderToComplete);
        } else {
            throw new Exception("Invalid Order");
        }
    }

    @PatchMapping("/drop/{orderId}")
    @PreAuthorize("hasRole('ROLE_BOOSTER') or hasRole('ROLE_ADMIN')")
    public void dropOrder(@PathVariable Long orderId) throws Exception {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            Order orderToComplete = order.get();
            orderToComplete.setStatus(EStatus.ORDER_NEW);
            orderToComplete.setAssignedTo(null);
            orderRepository.save(orderToComplete);
        } else {
            throw new Exception("Invalid Order");
        }
    }

}
