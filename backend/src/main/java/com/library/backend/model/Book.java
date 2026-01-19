package com.library.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "books")
public class Book {

    @Id
    @Getter
    @Setter(AccessLevel.NONE)
    private String id;

    @NotNull
    @Size(min = 1, max = 100)
    private String title;

    @NotNull
    private String author;

    @Indexed(unique = true)
    private String isbn;

    @Min(1500)
    private int year;
    private String cover;


    private String category;

    
     @Builder.Default
     private boolean available = true;
}
