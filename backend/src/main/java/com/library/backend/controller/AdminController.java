package com.library.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.backend.dto.UserDto;
import com.library.backend.services.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @PostMapping("/users/{userId}/roles/{role}")
    public ResponseEntity<UserDto> assignRole(@PathVariable String userId, @PathVariable String role) {
        return ResponseEntity.ok(adminService.assignRole(userId, role));
    }

    @DeleteMapping("/users/{userId}/roles/{role}")
    public ResponseEntity<UserDto> removeRole(@PathVariable String userId, @PathVariable String role) {
        return ResponseEntity.ok(adminService.removeRole(userId, role));
    }

    @PatchMapping("/users/{userId}/toggle-status")
    public ResponseEntity<UserDto> toggleStatus(@PathVariable String userId) {
        return ResponseEntity.ok(adminService.toggleUserStatus(userId));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable String userId,
            @RequestBody UserDto dto) {
        return ResponseEntity.ok(adminService.updateUser(userId, dto));
    }

}
