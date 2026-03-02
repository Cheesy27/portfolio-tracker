package com.fcproject.portfolio_tracker.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "holdings")
public class Holding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double quantity;

    @Column(nullable = false)
    private Double purchasePrice;
}