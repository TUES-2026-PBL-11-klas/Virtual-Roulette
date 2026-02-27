package com.virtualroulette.backend.controller;

import com.virtualroulette.backend.dto.BetRequest;
import com.virtualroulette.backend.model.WheelResult;
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
    public ResponseEntity<?> play(@RequestBody BetRequest request){
        try{
            Map<String,Object> result = gameService
                  .playBet(
                          request.getUserId(),request.getBetType(),
                          request.getAmount(),request.getNumber());
            return ResponseEntity.ok(result);
        }
        catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/spin")
    public ResponseEntity<WheelResult> spin(){
        int number = gameService.spinWheel();
        String color = gameService.getColorForNumber(number);
        return ResponseEntity.ok(new WheelResult(number, color));
    }
}
