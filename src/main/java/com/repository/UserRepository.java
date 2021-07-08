package com.repository;

import com.model.ERole;
import com.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findAllByAccountType(ERole accountType);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
