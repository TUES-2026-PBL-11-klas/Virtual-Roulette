package com.virtualroulette.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.virtualroulette.backend.service.GameService;
import com.virtualroulette.backend.model.Bet;
import com.virtualroulette.backend.model.User;



@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @PostMapping("/play")
    public String play(@RequestParam User user, @RequestParam Bet bet, GameService gameService){
        double result = gameService.playBet(user,bet);
        return "Wheel: " +  result + " , new balance: " + user.getBalance();
    }
}
