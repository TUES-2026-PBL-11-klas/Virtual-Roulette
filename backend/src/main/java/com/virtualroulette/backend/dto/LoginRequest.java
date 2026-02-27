package com.virtualroulette.backend.dto;

import lombok.Getter;

public class LoginRequest {
    @Getter
    private String username;
    @Getter
    private String password;
}
