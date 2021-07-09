package com.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String server;
    private String currentRank;
    private String desiredRank;
    private String currentRankTier;
    private String desiredRankTier;
    private String currentRankAmount;
    private String desiredRankAmount;

    private Boolean appearOffline;
    private Boolean specificAgent;
    private Boolean playWithBooster;
    private Boolean priorityOrder;
    private Boolean withStreaming;
    private Double totalAmount;
    private String createdDate;
    private String completionDate;
    private String wins;
    private boolean paid = false;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EStatus status;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @OneToOne(fetch = FetchType.LAZY)
    private User assignedTo;
}
