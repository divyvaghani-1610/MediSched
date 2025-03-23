package com.example.MediSched.dto;

public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private String role;

    // Constructors
    public RegisterRequest() {}

    public RegisterRequest(String email, String password, String name, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    // Getters
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }
}
