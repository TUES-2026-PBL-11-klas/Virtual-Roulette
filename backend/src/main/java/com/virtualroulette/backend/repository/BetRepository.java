package com.virtualroulette.backend.repository;

import com.virtualroulette.backend.model.Bet;
import com.virtualroulette.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

//Repository for the bets database helpfull for displaying game info and pulling out game history
public interface BetRepository extends JpaRepository<Bet,Long> {
    List<Bet> findBetByUserId(Long userId);

    Long user(User user);
}
