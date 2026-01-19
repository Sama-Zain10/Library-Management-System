
package com.library.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library.backend.dto.BookDto;
import com.library.backend.model.Book;
import com.library.backend.services.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_LIBRARIAN')")
    public ResponseEntity<Book> createBook(@RequestBody @Valid BookDto dto) {
    return ResponseEntity.ok(bookService.createBook(dto));
  }

    @GetMapping
  //  @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_LIBRARIAN','ROLE_MEMBER')")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
   // @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_LIBRARIAN','ROLE_MEMBER')")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @GetMapping("/search/title")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_LIBRARIAN','ROLE_MEMBER')")
    public ResponseEntity<List<Book>> searchByTitle(@RequestParam String title) {
        return ResponseEntity.ok(bookService.searchBooksByTitle(title));
    }

    @GetMapping("/search/author")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_LIBRARIAN','ROLE_MEMBER')")
    public ResponseEntity<List<Book>> searchByAuthor(@RequestParam String author) {
        return ResponseEntity.ok(bookService.searchBooksByAuthor(author));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_LIBRARIAN')")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book book) {
        return ResponseEntity.ok(bookService.updateBook(id, book));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_LIBRARIAN')")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
}
}