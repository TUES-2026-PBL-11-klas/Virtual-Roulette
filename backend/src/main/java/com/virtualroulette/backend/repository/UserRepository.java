package com.virtualroulette.backend.repository;
//Repository Interface for communicating with the database(reading,wrting,deleting,updating data)
//It basically handles database operations
import org.springframework.data.jpa.repository.JpaRepository;
import com.virtualroulette.backend.model.User;
import java.util.Optional;//I use the optional class to handle null values in a safer way
//So I dont run into a NullPointerExeception
//Basically ive created the layer that can do all the mentioned actions with the database with Optional safer


public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User>findByUsername(String username);
}
