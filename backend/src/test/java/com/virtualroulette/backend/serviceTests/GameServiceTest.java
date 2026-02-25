package com.virtualroulette.backend.serviceTests;

import com.virtualroulette.backend.model.BetType;
import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.repository.UserRepository;
import com.virtualroulette.backend.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GameServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private GameService gameService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void spinWheel_ShouldReturnNumberBetween0And36() {
        for (int i = 0; i < 100; i++) {
            int result = gameService.spinWheel();
            assertTrue(result >= 0 && result <= 36);
        }
    }

    @Test
    void calculatePayout_ShouldReturnCorrectPayout_ForStraightWin() {
        double payout = gameService.calculatePayout(BetType.STRAIGHT, 7, 100, 7);
        assertEquals(3500, payout);
    }

    @Test
    void calculatePayout_ShouldReturnZero_ForStraightLoss() {
        double payout = gameService.calculatePayout(BetType.STRAIGHT, 7, 100, 5);
        assertEquals(0, payout);
    }

    @Test
    void calculatePayout_ShouldReturnPayout_ForRedWin() {
        double payout = gameService.calculatePayout(BetType.RED, 0, 100, 1);
        assertEquals(100, payout);
    }

    @Test
    void calculatePayout_ShouldReturnZero_ForRedLoss() {
        double payout = gameService.calculatePayout(BetType.RED, 0, 100, 2);
        assertEquals(0, payout);
    }

    @Test
    void calculatePayout_ShouldReturnZero_ForRedOnZero() {
        double payout = gameService.calculatePayout(BetType.RED, 0, 100, 0);
        assertEquals(0, payout);
    }

    @Test
    void calculatePayout_ShouldReturnPayout_ForEvenWin() {
        double payout = gameService.calculatePayout(BetType.EVEN, 0, 100, 4);
        assertEquals(100, payout);
    }

    @Test
    void calculatePayout_ShouldReturnZero_ForEvenOnZero() {
        double payout = gameService.calculatePayout(BetType.EVEN, 0, 100, 0);
        assertEquals(0, payout);
    }

    @Test
    void calculatePayout_ShouldReturnPayout_ForLowWin() {
        double payout = gameService.calculatePayout(BetType.LOW, 0, 100, 10);
        assertEquals(100, payout);
    }

    @Test
    void calculatePayout_ShouldReturnZero_ForLowLoss() {
        double payout = gameService.calculatePayout(BetType.LOW, 0, 100, 20);
        assertEquals(0, payout);
    }

    @Test
    void playBet_ShouldThrow_WhenInsufficientFunds() {
        User user = new User("john", "hashed", 50);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> gameService.playBet(1L, BetType.RED, 100, 0));

        assertEquals("Insufficient funds!", ex.getMessage());
    }

    @Test
    void playBet_ShouldThrow_WhenUserNotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> gameService.playBet(99L, BetType.RED, 100, 0));

        assertEquals("User not found!", ex.getMessage());
    }

    @Test
    void playBet_ShouldDeductBalance_WhenBetLost() {
        User user = new User("john", "hashed", 1000);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        gameService.playBet(1L, BetType.STRAIGHT, 100, 7);

        assertTrue(user.getBalance() <= 1000);
    }
}