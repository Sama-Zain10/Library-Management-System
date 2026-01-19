package com.library.backend.strategy;

import com.library.backend.model.User;

public interface BorrowPolicy {
    int getMaxBooks(User user);        
    int getBorrowDays(User user);      
    double getFinePerDay(User user);  
}
