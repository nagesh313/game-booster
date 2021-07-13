package com.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class WinBoostings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String rank;
    private String tier;
    private Double amount;

    public WinBoostings(String rank, String tier, Double amount) {
        this.rank = rank;
        this.tier = tier;
        this.amount = amount;
    }
}
