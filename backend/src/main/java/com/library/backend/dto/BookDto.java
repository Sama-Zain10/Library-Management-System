package com.library.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookDto {
    private String id;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Author is required")
    private String author;
    
    @NotBlank(message = "ISBN is required")
    private String isbn;
    
    private String publisher;
    private Integer publishedYear;
    private String category;
    private String description;
    
    @NotNull(message = "Total copies is required")
    @Min(value = 1, message = "Total copies must be at least 1")
    private Integer totalCopies;
    
    private Integer availableCopies;
        private String cover; 
}
