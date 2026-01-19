package com.library.backend.strategy;

import com.library.backend.model.User;

public class MemberBorrowPolicy implements BorrowPolicy {

    @Override
    public int getMaxBooks(User user) {
        return 3;
    }

    @Override
    public int getBorrowDays(User user) {
        return 14;
    }

    @Override
    public double getFinePerDay(User user) {
        return 2.0;
    }
}
