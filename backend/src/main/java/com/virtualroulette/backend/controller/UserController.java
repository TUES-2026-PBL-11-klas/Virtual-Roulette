package com.virtualroulette.backend.controller;


import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//Controller to handle the login and registration requests and to return the user info.

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){this.userService = userService;}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam String username,@RequestParam String password){
        try{
            User user = userService.register(username,password);
            return ResponseEntity.ok(user);
        }
        catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username,@RequestParam String password){
        try{
            User user = userService.login(username,password);
            return ResponseEntity.ok(user);
        }
        catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        try{
            return ResponseEntity.ok(userService.getUser(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<?> getUserHistory(@PathVariable Long id){
        try {
             return ResponseEntity.ok(userService.getUserHistory(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
