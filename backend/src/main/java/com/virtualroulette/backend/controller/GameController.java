package com.virtualroulette.backend.controller;

import com.virtualroulette.backend.model.BetType;
import jakarta.persistence.Entity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.virtualroulette.backend.service.GameService;
import com.virtualroulette.backend.model.Bet;
import com.virtualroulette.backend.model.User;
import org.springframework.web.servlet.function.EntityResponse;


@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @PostMapping("/play")
    public ResponseEntity<?> play(
            @RequestParam Long userId,
            @RequestParam BetType betType,
            @RequestParam double amount,
            @RequestParam int number){
        try{
            double result = gameService.playBet(userId,betType,amount,number);
            return ResponseEntity.ok("Wheel: "+ result);
        }
        catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
