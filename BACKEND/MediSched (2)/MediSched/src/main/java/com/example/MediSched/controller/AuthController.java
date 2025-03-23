package com.example.MediSched.controller;

import com.example.MediSched.dto.*;
import com.example.MediSched.entity.User;
import com.example.MediSched.repository.UserRepository;
import com.example.MediSched.utils.JwtUtil; // Ensure this import is present
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // Constructor-based dependency injection
    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "User already exists!";
        }
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User(null, request.getEmail(), encodedPassword, request.getName(), request.getRole());
        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public JwtResponse loginUser(@RequestBody LoginRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            String token = jwtUtil.generateToken(user.get().getEmail());
            return new JwtResponse(token);
        }
        return new JwtResponse("Invalid credentials");
    }
}
