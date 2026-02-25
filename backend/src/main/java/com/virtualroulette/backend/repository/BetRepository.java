package com.virtualroulette.backend.repository;

import com.virtualroulette.backend.model.Bet;
import org.springframework.data.jpa.repository.JpaRepository;



public interface BetRepository extends JpaRepository<Bet,Long> {

}
