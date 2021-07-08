package com.model;

import com.model.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class AccountInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String server;
    private String summonerName;
    private String accountName;
    private String accountPassword;
    private String lolAccount;
    private String lolPassword;
    private String paypalEmail;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
