package com.library.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.library.backend.dto.RegisterUserDto;
import com.library.backend.dto.UserDto;
import com.library.backend.exception.ResourceNotFoundException;
import com.library.backend.model.User;
import com.library.backend.repo.UserRepo;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService  {

    private final UserRepo userRepo;

    public User registerUser(RegisterUserDto dto) {
    if (userRepo.existsByUsername(dto.getUsername()))
        throw new RuntimeException("Username exists");
    if (userRepo.existsByEmail(dto.getEmail()))
        throw new RuntimeException("Email exists");

    User user = new User();
    user.setFullName(dto.getFullName());
    user.setUsername(dto.getUsername());
    user.setEmail(dto.getEmail());
    user.setPassword(dto.getPassword());
    user.setPhone(dto.getPhone());
    user.setRole(dto.getRole());  
    user.setActive(true);

    return userRepo.save(user);
}

public User findByEmail(String email) {
    return userRepo.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
}

public UserDto getUserById(String id) {
    Objects.requireNonNull(id, "User ID cannot be null");
    User user = userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return convertToDto(user);
}
public UserDto getUserByEmail(String email) {
    User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return mapToDto(user);
}

    public List<UserDto> getAllUsers() {
        return userRepo.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }
public void deleteUser(String id) {
    Objects.requireNonNull(id, "User ID cannot be null");
    if (!userRepo.existsById(id)) throw new ResourceNotFoundException("User not found");
    userRepo.deleteById(id);
}
private UserDto mapToDto(User user) {
    UserDto dto = new UserDto();
    dto.setId(user.getId());
    dto.setFullName(user.getFullName());
    dto.setEmail(user.getEmail());
    dto.setPhone(user.getPhone()); 
    dto.setRole(user.getRole());
    dto.setActive(user.isActive());
    dto.setCreatedAt(user.getCreatedAt());
    return dto;
}



public UserDto updateUser(String id, UserDto dto) {
    Objects.requireNonNull(id, "User ID cannot be null");
    Objects.requireNonNull(dto, "UserDto cannot be null");
    User user = userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    user.setFullName(dto.getFullName());
    user.setEmail(dto.getEmail());
    user.setPhone(dto.getPhone());
    user.setUpdatedAt(LocalDateTime.now());
    return convertToDto(userRepo.save(user));
}

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}
