package com.virtualroulette.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id; //randomly generated id

    @Column(unique = true)
    @NotBlank
    private String username; //The users username and password
    @NotBlank
    private String password;
    @PositiveOrZero
    private double balance; //The users balance

    public User(){} //basic constructor for jpa because it reads the data first then it adds it to the instance

    public User(String username,String password,double balance){ //constrcutor with parameters
        this.username = username;
        this.password = password;
        this.balance = balance;
    }

    public Long getId() {return id;}
    public String getUsername(){return username;}
    public String getPassword(){return password;}
    public double getBalance(){return balance;}
    public void setBalance(double balance){this.balance = balance;}

}
