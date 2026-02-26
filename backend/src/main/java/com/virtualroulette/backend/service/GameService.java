package com.virtualroulette.backend.service;

import com.virtualroulette.backend.model.Bet;
import com.virtualroulette.backend.model.BetType;
import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.repository.BetRepository;
import com.virtualroulette.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;


@Service
public class GameService {

    private final Random random = new Random();
    private final UserRepository userRepository;
    private final BetRepository betRepository;



    public GameService(UserRepository userRepository,BetRepository betRepository){
        this.userRepository = userRepository;
        this.betRepository = betRepository;
    }

    public int spinWheel(){
        return random.nextInt(37);
    }

    private boolean isRed(int number){
        int[] reds = {1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36};
        for (int red : reds){
            if(red == number) return true;
        }
        return false;
    }

    public double calculatePayout(BetType type, int number, double amount, int result){
        double payout = 0.0;
        switch(type){
            case STRAIGHT:
                if(number == result) payout = amount * 35;
                break;
            case RED:
                if(isRed(result)) payout = amount;
                break;
            case BLACK:
                if(!isRed(result) && result != 0) payout = amount;
                break;
            case EVEN:
                if(result != 0 && result % 2 == 0) payout = amount;
                break;
            case ODD:
                if(result != 0 && result % 2 != 0) payout = amount;
                break;
            case LOW:
                if(result >= 1 && result <= 18) payout = amount;
                break;
            case HIGH:
                if(result >= 19 && result <= 36) payout = amount;
                break;
        }
        return payout;
    }

    public Map<String,Object> playBet(Long userId,BetType betType,double amount,int number){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new RuntimeException("User not found!"));
        if(user.getBalance() < amount){
            throw new RuntimeException("Insufficient funds!");
        }

        int result = spinWheel();
        double payout = calculatePayout(betType,number,amount,result);
        double newBalance = user.getBalance() - amount + payout;
        user.setBalance(Math.round(newBalance*100.0) / 100.0);
        userRepository.save(user);
        Bet bet = new Bet(betType,number,amount,user);
        betRepository.save(bet);


        Map<String,Object> response = new HashMap<>();
        response.put("wheelResult",result);
        response.put("payout",payout);
        response.put("newBalance",newBalance);
        response.put("wonOrLost",(payout > 0));
        response.put("betType",betType);
        response.put("amount",amount);

        return response;
    }


}
