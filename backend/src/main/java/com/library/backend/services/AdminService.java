package com.library.backend.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.library.backend.dto.UserDto;
import com.library.backend.exception.ResourceNotFoundException;
import com.library.backend.model.User;
import com.library.backend.repo.BookRepo;
import com.library.backend.repo.BorrowRepo;
import com.library.backend.repo.UserRepo;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepo userRepo;
    private final BookRepo bookRepo;
    private final BorrowRepo borrowRepo;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalBooks", bookRepo.count());
        stats.put("totalBorrows", borrowRepo.count());
        stats.put("activeBorrows",
                borrowRepo.findByDueDateBeforeAndStatus(LocalDateTime.now().toLocalDate(), "BORROWED").size());
        return stats;
    }

    public UserDto assignRole(@NonNull String userId, @NonNull String role) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole(role.toUpperCase());
        } else {
            String[] existingRoles = user.getRole().split(",\\s*");
            boolean alreadyExists = false;
            for (String r : existingRoles) {
                if (r.equalsIgnoreCase(role)) {
                    alreadyExists = true;
                    break;
                }
            }
            if (!alreadyExists) {
                user.setRole(user.getRole() + ", " + role.toUpperCase());
            }
        }

        user.setUpdatedAt(LocalDateTime.now());
        return convertToDto(userRepo.save(user));
    }

    public UserDto removeRole(@NonNull String userId, @NonNull String role) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != null && !user.getRole().isEmpty()) {
            String[] roles = user.getRole().split(",\\s*");
            StringBuilder sb = new StringBuilder();
            for (String r : roles) {
                if (!r.equalsIgnoreCase(role)) {
                    if (sb.length() > 0) sb.append(", ");
                    sb.append(r.toUpperCase());
                }
            }
            user.setRole(sb.toString());
        }

        user.setUpdatedAt(LocalDateTime.now());
        return convertToDto(userRepo.save(user));
    }

    public UserDto toggleUserStatus(@NonNull String userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setActive(!user.isActive());
        user.setUpdatedAt(LocalDateTime.now());
        return convertToDto(userRepo.save(user));
    }
    public UserDto updateUser(String userId, UserDto dto) {
    User user = userRepo.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    user.setFullName(dto.getFullName());
    user.setEmail(dto.getEmail());
    user.setRole(dto.getRole());
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
