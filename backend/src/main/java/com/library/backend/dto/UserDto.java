package com.library.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserDto {
    private String id;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String role; 
    private boolean active;
    private LocalDateTime createdAt;
}
