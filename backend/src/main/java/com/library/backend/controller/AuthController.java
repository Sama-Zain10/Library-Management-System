package com.library.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.backend.config.JwtService;
import  com.library.backend.dto.RegisterUserDto;
import com.library.backend.model.User;
import com.library.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager; 
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


@PostMapping("/register")
public ResponseEntity<User> register(@RequestBody RegisterUserDto dto) {
    dto.setPassword(passwordEncoder.encode(dto.getPassword())); 
    User user = userService.registerUser(dto);
    return ResponseEntity.ok(user);
}
@PostMapping("/login")
public ResponseEntity<Map<String, Object>> login(@RequestBody RegisterUserDto dto) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
    );

    User user = userService.findByEmail(dto.getEmail());

    UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPassword())
            .authorities(user.getRole())
            .build();

    final String jwtToken = jwtService.generateToken(userDetails);

    Map<String, Object> response = new HashMap<>();
    response.put("token", jwtToken);
    response.put("user", userService.getUserByEmail(user.getEmail())); 

    return ResponseEntity.ok(response);
}
}