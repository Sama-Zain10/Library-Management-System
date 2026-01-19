
package com.library.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BorrowDto {
    private String id;
    private String userId;
    private String bookId;
    private String bookTitle;
    private String bookAuthor;
    private String userName;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status;
    private Double fine;
}
