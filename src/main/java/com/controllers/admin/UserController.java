package com.controllers.admin;

import com.model.AccountInformation;
import com.model.ERole;
import com.model.User;
import com.payload.request.AccountInfo;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/admin")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> all() {
        return userRepository.findAll();
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAllByAccountType(ERole.ROLE_USER);
    }

    @GetMapping("/boosters")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllBoosters() {
        return userRepository.findAllByAccountType(ERole.ROLE_BOOSTER);
    }

    @PostMapping("/booster/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createBooster(@RequestBody User booster) throws Exception {
        booster.setAccountType(ERole.ROLE_BOOSTER);
        if (booster.getId() != null) {
            Optional<User> user = userRepository.findById(booster.getId());
            if (user.isPresent()) {
                userRepository.save(booster);
            } else {
                throw new Exception("User Not Found");
            }
        } else {
            Optional<User> user = userRepository.findByUsername(booster.getUsername());
            if (user.isPresent()) {
                throw new Exception("UserName Already Exists.");
            } else {
                userRepository.save(booster);
            }
        }
        return ResponseEntity.ok("User activated");
    }


    @PostMapping("/user")
    @PreAuthorize("hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/user/activate/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> activateUser(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User userObject = user.get();
            userRepository.save(userObject);
        } else {
            throw new Exception("User Not Found");
        }
        return ResponseEntity.ok("User activated");
    }

    @GetMapping("/user/deactivate/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deActivateUser(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User userObject = user.get();
            userRepository.save(userObject);
        } else {
            throw new Exception("User Not Found");
        }
        return ResponseEntity.ok("User activated");
    }

    @DeleteMapping("/user/delete/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User userObject = user.get();
            userRepository.deleteById(userId);
        } else {
            throw new Exception("User Not Found");

        }
        return ResponseEntity.ok("User Deleted");
    }


    @GetMapping("/account-information/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER') or hasRole('ROLE_BOOSTER')")
    public AccountInformation getAccountInformation(@PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getAccountInformations();
        } else {
            throw new Exception("User Doesn't Exist.");
        }
    }

    @PostMapping("/account-information/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER') or hasRole('ROLE_BOOSTER')")
    public ResponseEntity<String> saveAccountInformation(@RequestBody AccountInfo payload, @PathVariable Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User userToUpdate = user.get();
            AccountInformation accountInformation;
            if (userToUpdate.getAccountInformations() == null) {
                accountInformation = new AccountInformation();
            } else {
                accountInformation = userToUpdate.getAccountInformations();
            }
            accountInformation.setLolAccount(payload.getLolAccount());
            accountInformation.setLolPassword(payload.getLolPassword());
            accountInformation.setSummonerName(payload.getSummonerName());
            accountInformation.setPaypalEmail(payload.getPaypalEmail());
            userToUpdate.setAccountInformations(accountInformation);
            userRepository.save(userToUpdate);
        } else {
            throw new Exception("User Doesn't Exist.");
        }
        return ResponseEntity.ok("User activated");
    }
//
//    @GetMapping("/mod")
//    @PreAuthorize("hasRole('MODERATOR')")
//    public String moderatorAccess() {
//        return "Moderator Board.";
//    }
//
//    @GetMapping("/admin")
//    @PreAuthorize("hasRole('ADMIN')")
//    public String adminAccess() {
//        return "Admin Board.";
//    }
}
