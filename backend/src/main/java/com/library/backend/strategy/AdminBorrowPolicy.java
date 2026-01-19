package com.library.backend.strategy;

import com.library.backend.model.User;

public class AdminBorrowPolicy implements BorrowPolicy {

    @Override
    public int getMaxBooks(User user) {
        return 10;
    }

    @Override
    public int getBorrowDays(User user) {
        return 30;
    }

    @Override
    public double getFinePerDay(User user) {
        return 0.0; 
    }
}
