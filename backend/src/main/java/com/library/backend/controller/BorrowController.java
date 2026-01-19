
package com.library.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library.backend.dto.BorrowDto;
import com.library.backend.model.Borrow;
import com.library.backend.services.BorrowService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/borrows")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;

    @PostMapping("/borrow")
    public ResponseEntity<Borrow> borrowBook(@RequestParam String userId, @RequestParam String bookId) {
        return ResponseEntity.ok(borrowService.borrowBook(userId, bookId));
    }

    @PostMapping("/return/{borrowId}")
    public ResponseEntity<Borrow> returnBook(@PathVariable String borrowId) {
        return ResponseEntity.ok(borrowService.returnBook(borrowId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BorrowDto>> getUserBorrows(@PathVariable String userId) {
        return ResponseEntity.ok(borrowService.getUserBorrows(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<BorrowDto>> getAllBorrowsDto() {
        return ResponseEntity.ok(borrowService.getAllBorrowsDto());
    }
}
