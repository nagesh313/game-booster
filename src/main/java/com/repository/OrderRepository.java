package com.repository;

import com.model.ERole;
import com.model.EStatus;
import com.model.Order;
import com.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUser(User user);

    List<Order> findAllByStatus(EStatus status);

//    List<Order> findAllByStatus(List<EStatus> status);

    List<Order> findAllByAssignedToAndStatus(User user, EStatus status);

}
