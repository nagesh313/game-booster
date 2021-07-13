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
public class Placements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String rank;
    private Double amount;
    private Double multiplier;

    public Placements(String rank, Double amount) {
        this.rank = rank;
        this.amount = amount;
    }
}
