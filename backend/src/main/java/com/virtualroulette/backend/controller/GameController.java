package com.virtualroulette.backend.controller;

import com.virtualroulette.backend.model.BetType;
import com.virtualroulette.backend.repository.BetRepository;
import jakarta.persistence.Entity;
import java.util.Map;
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
    private final BetRepository betRepository;

    public GameController(GameService gameService, BetRepository betRepository){
        this.gameService = gameService;
        this.betRepository = betRepository;
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
