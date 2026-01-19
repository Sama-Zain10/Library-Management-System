
package com.library.backend.services;

import com.library.backend.model.Book;
import com.library.backend.repo.BookRepo;
import com.library.backend.dto.BookDto;
import com.library.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.NonNull;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepo bookRepo;

    
public Book createBook(BookDto dto) {

    if (bookRepo.existsByIsbn(dto.getIsbn())) {
        throw new IllegalArgumentException("Book with this ISBN already exists");
    }

    Book book = Book.builder()
            .title(dto.getTitle())
            .author(dto.getAuthor())
            .isbn(dto.getIsbn())
            .year(dto.getPublishedYear() != null ? dto.getPublishedYear() : 0)
            .category(dto.getCategory())
            .available(true)
            .build();

    return bookRepo.save(book);
}

public Book getBookById(@NonNull String id) {
    return bookRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
}
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

public Book updateBook(String id, Book updatedBook) {
    Objects.requireNonNull(id, "Book ID cannot be null");
    Objects.requireNonNull(updatedBook, "Updated Book cannot be null");

    Book book = bookRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        if (!book.getIsbn().equals(updatedBook.getIsbn())
            && bookRepo.existsByIsbn(updatedBook.getIsbn())) {
        throw new IllegalArgumentException("ISBN already exists");
    }

    book.setTitle(updatedBook.getTitle());
    book.setAuthor(updatedBook.getAuthor());
    book.setIsbn(updatedBook.getIsbn());
    book.setYear(updatedBook.getYear());
    book.setCategory(updatedBook.getCategory());
    book.setAvailable(updatedBook.isAvailable());

    return bookRepo.save(book);
}

public void deleteBook(@NonNull String id) {
    if (!bookRepo.existsById(id)) {
        throw new ResourceNotFoundException("Book not found");
    }
    bookRepo.deleteById(id);
}

    public List<Book> searchBooksByTitle(String title) {
        Objects.requireNonNull(title, "Title cannot be null");
        return bookRepo.findByTitleContainingIgnoreCase(title);
    }

    public List<Book> searchBooksByAuthor(String author) {
        Objects.requireNonNull(author, "Author cannot be null");
        return bookRepo.findByAuthorContainingIgnoreCase(author);
}
}