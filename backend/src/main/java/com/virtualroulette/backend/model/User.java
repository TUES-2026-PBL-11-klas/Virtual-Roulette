package com.virtualroulette.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id; //randomly generated id
    @NotBlank
    private String username; //The users username and password
    @NotBlank
    private String password;
    @PositiveOrZero
    private BigDecimal balance; //The users balance

    public User(){} //basic constructor for jpa because it reads the data first then it adds it to the instance

    public User(String username,String password,BigDecimal balance){ //constrcutor with parameters
        this.username = username;
        this.password = password;
        this.balance = balance;
    }

}
