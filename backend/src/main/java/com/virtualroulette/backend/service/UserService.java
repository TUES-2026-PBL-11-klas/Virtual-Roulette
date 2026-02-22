package com.virtualroulette.backend.service;

import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){ //constructor for the user repository
        this.userRepository = userRepository;
    }

    public User register(String username,String password){
        User user = new User(username,password,10000); //Creation of a new user through registration
        return userRepository.save(user);
    }

    public User getUser(Long id){
        //getter for finding a user through the user id and it throws an exception if the user isnt found
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found."));
    }
}
