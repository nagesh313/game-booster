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
public class Rates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String rankFrom;
    private String rankTo;
    private String tierFrom;
    private String tierTo;
    private Double amount;
    private boolean disabled;

    public Rates(String rankFrom, String rankTo, String tierFrom, String tierTo, Double amount) {
        this.rankFrom = rankFrom;
        this.rankTo = rankTo;
        this.tierFrom = tierFrom;
        this.tierTo = tierTo;
        this.amount = amount;
    }
}
