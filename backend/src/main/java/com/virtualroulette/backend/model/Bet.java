package com.virtualroulette.backend.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "bet")
public class Bet {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private  BetType type;

    @Getter
    private int number; //used for straight split etc. bets

    @Getter
    private double amount;//Amount of the bet


    @Getter
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    public Bet() {}

    public Bet(BetType type, int number, double amount, User user){
        this.type = type;
        this.number = number;
        this.amount = amount;
        this.user = user;
    }

}
