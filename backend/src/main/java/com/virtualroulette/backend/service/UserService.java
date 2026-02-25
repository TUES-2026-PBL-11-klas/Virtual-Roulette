package com.virtualroulette.backend.service;

import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){ //constructor for the user repository
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(String username,String password){
        if(userRepository.findByUsername(username).isPresent()){
            throw new RuntimeException("Username already taken!");
        }
        User user = new User(username,passwordEncoder.encode(password),10000);//Creation of a new user through registration
        return userRepository.save(user);
    }

    public User login(String username,String password){
        User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found!"));
        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Incorrect password!");
        }
        return user;
    }

    public User getUser(Long id){
        //getter for finding a user through the user id and it throws an exception if the user isnt found
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
    }
}
