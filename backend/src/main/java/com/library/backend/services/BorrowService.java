
package com.library.backend.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.library.backend.dto.BorrowDto;
import com.library.backend.exception.ResourceNotFoundException;
import com.library.backend.model.Book;
import com.library.backend.model.Borrow;
import com.library.backend.repo.BookRepo;
import com.library.backend.repo.BorrowRepo;
import com.library.backend.repo.UserRepo;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class BorrowService {

    private final BorrowRepo borrowRepo;
    private final BookRepo bookRepo;
    private final UserRepo userRepo;

    @Transactional
    public Borrow borrowBook(@NonNull String userId, @NonNull String bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if (!book.isAvailable()) throw new RuntimeException("Book is currently unavailable");

        Borrow borrow = new Borrow();
        borrow.setUserId(userId);
        borrow.setBookId(bookId);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setDueDate(LocalDate.now().plusDays(14));
        borrow.setStatus("BORROWED");

        book.setAvailable(false);
        bookRepo.save(book);

        return borrowRepo.save(borrow);
    }

    @Transactional
    public Borrow returnBook(@NonNull String borrowId) {
        Borrow borrow = borrowRepo.findById(borrowId)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow not found"));

        borrow.setReturnDate(LocalDate.now());
        borrow.setStatus("RETURNED");

        Book book = bookRepo.findById(borrow.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        book.setAvailable(true);
        bookRepo.save(book);

        return borrowRepo.save(borrow);
    }

    // جميع الاستعارات مع اسم المستخدم
    public List<BorrowDto> getAllBorrowsDto() {
        return borrowRepo.findAll().stream().map(b -> {
            BorrowDto dto = new BorrowDto();
            dto.setId(b.getId());
            dto.setBookId(b.getBookId());
            dto.setUserId(b.getUserId());
            dto.setStatus(b.getStatus());
            dto.setBorrowDate(b.getBorrowDate());
            dto.setDueDate(b.getDueDate());
            dto.setReturnDate(b.getReturnDate());
            dto.setFine(b.getFine());

            userRepo.findById(b.getUserId()).ifPresent(u -> dto.setUserName(u.getFullName()));
            return dto;
        }).toList();
    }

    // استعارات المستخدم الحالي
    public List<BorrowDto> getUserBorrows(String userId) {
        return borrowRepo.findByUserId(userId).stream().map(b -> {
            BorrowDto dto = new BorrowDto();
            dto.setId(b.getId());
            dto.setBookId(b.getBookId());
            dto.setUserId(b.getUserId());
            dto.setStatus(b.getStatus());
            dto.setBorrowDate(b.getBorrowDate());
            dto.setDueDate(b.getDueDate());
            dto.setReturnDate(b.getReturnDate());
            dto.setFine(b.getFine());

            userRepo.findById(b.getUserId()).ifPresent(u -> dto.setUserName(u.getFullName()));
            return dto;
        }).toList();
    }
}
