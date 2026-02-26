package com.virtualroulette.backend.controller;

import com.virtualroulette.backend.model.BetType;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.virtualroulette.backend.service.GameService;

//Game Controller handles all the http requests for the game itself returning the wanted information
//An entry point for the api

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
            Map<String,Object> result = gameService.playBet(userId,betType,amount,number);
            return ResponseEntity.ok(result);
        }
        catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
