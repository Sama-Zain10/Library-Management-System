

package com.library.backend.services;

import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.library.backend.model.User;
import com.library.backend.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@Primary
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepo.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole()) 
            .build();
}
}

