package com.payload.request;

import com.model.ERole;
import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;
    private ERole accountType;
}
