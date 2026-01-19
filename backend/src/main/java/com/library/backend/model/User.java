package com.library.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;
    private String username;
    private String email;
    private String password;
    private String phone;

    private boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    private String role ;
}
