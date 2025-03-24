package com.medibook.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}