package com.virtualroulette.backend.dto;

import com.virtualroulette.backend.model.BetType;
import lombok.Getter;

public class BetRequest {
    @Getter
    private Long userId;
    @Getter
    private double amount;
    @Getter
    private BetType betType;
    @Getter
    private int number;


}
