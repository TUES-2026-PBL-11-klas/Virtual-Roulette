package com.virtualroulette.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "users")
public class User {
    @Getter
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id; //randomly generated id

    @Getter
    @Column(unique = true)
    @NotBlank
    private String username; //The users username and password

    @Getter
    @NotBlank
    private String password;

    @Getter
    @Setter
    @PositiveOrZero
    private double balance; //The users balance

    public User(){} //basic constructor for jpa because it reads the data first then it adds it to the instance

    public User(String username,String password,double balance){ //constrcutor with parameters
        this.username = username;
        this.password = password;
        this.balance = balance;
    }

}
