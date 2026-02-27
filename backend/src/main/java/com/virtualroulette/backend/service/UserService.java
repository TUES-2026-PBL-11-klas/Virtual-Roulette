package com.virtualroulette.backend.service;

import com.virtualroulette.backend.model.Bet;
import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.repository.BetRepository;
import com.virtualroulette.backend.repository.UserRepository;
import org.hibernate.type.descriptor.java.ObjectJavaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.virtualroulette.backend.service.JwtUtil;
import java.util.Map;
import java.util.HashMap;


import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BetRepository betRepository;
    private final JwtUtil jwtUtil;


    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, BetRepository betRepository,JwtUtil jwtUtil){ //constructor for the user repository
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.betRepository = betRepository;
        this.jwtUtil = jwtUtil;
    }

    public Map<String,Object> register(String username, String password){
        if(userRepository.findByUsername(username).isPresent()){
            throw new RuntimeException("Username already taken!");
        }
        User user = new User(username, passwordEncoder.encode(password), 10000);
        userRepository.save(user);
        String token = jwtUtil.generateToken(username);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }

    public Map<String,Object> login(String username,String password){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Incorrect password!");
        }
        String token = jwtUtil.generateToken(username);

        Map<String,Object> response = new HashMap<>();
        response.put("token",token);
        response.put("user",user);
        return  response;
    }

    public User getUser(Long id){
        //getter for finding a user through the user id and it throws an exception if the user isnt found
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
    }

    public List<Bet> getUserHistory(Long userId){
        return betRepository.findBetByUserId(userId);
    }
}
