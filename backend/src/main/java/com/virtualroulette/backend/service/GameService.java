package com.virtualroulette.backend.service;

import com.virtualroulette.backend.model.Bet;
import com.virtualroulette.backend.model.BetType;
import com.virtualroulette.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class GameService {

    private final Random random = new Random();


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

    public double calculatePayout(Bet bet, int result){
        double payout = 0.0;

        switch(bet.getType()){
            case STRAIGHT:
                if(bet.getNumber() == result) payout = bet.getAmount() * 35;
                break;
            case RED:
                if(isRed(result)) payout = bet.getAmount();
                break;
            case BLACK:
                if(!isRed(result) && result != 0) payout = bet.getAmount();
                break;
            case EVEN:
                if(result != 0 && result % 2 ==0) payout = bet.getAmount();
                break;
        }
        return payout;
    }

    public double playBet(User user, Bet bet){
        int result = spinWheel();
        double payout = calculatePayout(bet,result);
        double newBalance = user.getBalance() - bet.getAmount() + payout;
        user.setBalance(Math.round(newBalance * 100.0)/100.0);
        return result;
    }

}
