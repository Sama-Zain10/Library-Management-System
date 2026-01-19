package com.library.backend.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "borrows")
public class Borrow {

    @Id
    private String id;

    private String userId;

    @NotNull
    private String bookId;

    private LocalDate borrowDate;
    private String bookTitle;
    private String bookAuthor;
    private LocalDate returnDate;

    private LocalDate dueDate;

    private String status;

    private double fine;
}
