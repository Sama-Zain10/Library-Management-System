package com.library.backend.strategy;

import com.library.backend.model.User;

public class BorrowPolicyFactory {

    public static BorrowPolicy getPolicy(User user) {
        if (user.getRole().contains("ADMIN")) {
            return new AdminBorrowPolicy();
        } else {
            return new MemberBorrowPolicy();
        }
    }
}
