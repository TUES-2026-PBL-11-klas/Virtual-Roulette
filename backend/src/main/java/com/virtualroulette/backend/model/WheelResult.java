package com.virtualroulette.backend.model;

public class WheelResult {

    private final int number;
    private final String color;

    public WheelResult(int number, String color) {
        this.number = number;
        this.color = color;
    }

    public int getNumber() {
        return number;
    }

    public String getColor() {
        return color;
    }
}

