package com.virtualroulette.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bet")
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private  BetType type;

    private int number; //used for straight split etc. bets

    private double amount;//Amount of the bet

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

    public Long getId(){return id;}
    public BetType getType(){return type;}
    public int getNumber(){return number;}
    public double getAmount(){return amount;}
    public User getUser(){return user;}

}
