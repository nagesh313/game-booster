package com.model;

import lombok.Data;

@Data
public class AdminOrder {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String lolAccount;
    private String lolPassword;
    private String summonerName;
    private String server;
    private String startLeague;
    private String desiredLeague;
    private String boostType;
    private String startDivision;
    private String desiredDivision;
    private String rankAmount;
    private String duoBoost;
    private Long wins;
    private String flash;
    private Double price;
    private String createdDate;
    private EStatus status;
    private User user;
}
