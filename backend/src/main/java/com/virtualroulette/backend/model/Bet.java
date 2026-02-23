package com.virtualroulette.backend.model;

import jakarta.persistence.*;

@Entity
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private  BetType type;

    private int number; //used for straight split etc. bets

    private double amount;//Amount of the bet

    @ManyToOne
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
