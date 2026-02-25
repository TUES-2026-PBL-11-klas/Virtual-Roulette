package com.virtualroulette.backend.serviceTests;

import com.virtualroulette.backend.model.User;
import com.virtualroulette.backend.repository.UserRepository;
import com.virtualroulette.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register_ShouldSaveUser_WhenUsernameIsAvailable() {
        when(userRepository.findByUsername("john")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("1234")).thenReturn("hashed1234");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        User result = userService.register("john", "1234");

        assertEquals("john", result.getUsername());
        assertEquals("hashed1234", result.getPassword());
        assertEquals(10000, result.getBalance());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_ShouldThrow_WhenUsernameIsTaken() {
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(new User()));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.register("username", "1234"));

        assertEquals("Username already taken!", ex.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_ShouldReturnUser_WhenCredentialsAreCorrect() {
        User user = new User("username", "hashed1234", 10000);
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("1234", "hashed1234")).thenReturn(true);

        User result = userService.login("username", "1234");

        assertEquals("username", result.getUsername());
    }

    @Test
    void login_ShouldThrow_WhenUserNotFound() {
        when(userRepository.findByUsername("john")).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.login("john", "1234"));

        assertEquals("User not found!", ex.getMessage());
    }

    @Test
    void login_ShouldThrow_WhenPasswordIsWrong() {
        User user = new User("john", "hashed1234", 10000);
        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongpassword", "hashed1234")).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.login("john", "wrongpassword"));

        assertEquals("Incorrect password!", ex.getMessage());
    }

    @Test
    void getUser_ShouldReturnUser_WhenIdExists() {
        User user = new User("username", "1234", 10000);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUser(1L);

        assertEquals("username", result.getUsername());
    }

    @Test
    void getUser_ShouldThrow_WhenIdNotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.getUser(99L));

        assertEquals("User not found!", ex.getMessage());
    }
}