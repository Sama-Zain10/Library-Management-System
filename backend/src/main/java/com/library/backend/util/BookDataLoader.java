package com.library.backend.util;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.library.backend.model.Book;
import com.library.backend.repo.BookRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BookDataLoader implements CommandLineRunner {

    private final BookRepo bookRepo;

    @Override
    public void run(String... args) {

        if (bookRepo.count() > 0) {
            System.out.println("📚 Books already exist, skipping insert...");
            return;
        }

        List<Book> books = List.of(

                Book.builder()
                        .title("Atomic Habits")
                        .author("James Clear")
                        .isbn("ISBN-001")
                        .year(2018)
                        .category("Self Help")
                        .cover("atomic-habits..jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("Deep Work")
                        .author("Cal Newport")
                        .isbn("ISBN-002")
                        .year(2016)
                        .category("Productivity")
                        .cover("deep-work.jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("The Subtle Art of Not Giving a F*ck")
                        .author("Mark Manson")
                        .isbn("ISBN-003")
                        .year(2016)
                        .category("Self Help")
                        .cover("subtle-art..jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("Rich Dad Poor Dad")
                        .author("Robert Kiyosaki")
                        .isbn("ISBN-004")
                        .year(1997)
                        .category("Finance")
                        .cover("rich-dad-poor-dad..jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("The 48 Laws of Power")
                        .author("Robert Greene")
                        .isbn("ISBN-005")
                        .year(1998)
                        .category("Psychology")
                        .cover("laws.jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("Can't Hurt Me")
                        .author("David Goggins")
                        .isbn("ISBN-006")
                        .year(2018)
                        .category("Motivation")
                        .cover("cant-hurt-me.jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("Think and Grow Rich")
                        .author("Napoleon Hill")
                        .isbn("ISBN-007")
                        .year(1937)
                        .category("Success")
                        .cover("think-grow-rich.jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("Who Moved My Cheese?")
                        .author("Spencer Johnson")
                        .isbn("ISBN-008")
                        .year(1998)
                        .category("Motivation")
                        .cover("who-moved-my-cheese.jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("How to Win Friends & Influence People")
                        .author("Dale Carnegie")
                        .isbn("ISBN-009")
                        .year(1936)
                        .category("Communication")
                        .cover("win-friends..jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("The Power of Now")
                        .author("Eckhart Tolle")
                        .isbn("ISBN-010")
                        .year(1997)
                        .category("Spirituality")
                        .cover("power-of-now..jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("The Alchemist")
                        .author("Paulo Coelho")
                        .isbn("ISBN-011")
                        .year(1988)
                        .category("Novel")
                        .cover("alchemist..jpg")
                        .available(true)
                        .build(),

                Book.builder()
                        .title("The Psychology of Money")
                        .author("Morgan Housel")
                        .isbn("ISBN-012")
                        .year(2020)
                        .category("Finance")
                        .cover("psychology-money..jpg")
                        .available(true)
                        .build()
        );

        bookRepo.saveAll(books);
        System.out.println("✅ Books inserted successfully!");
    }
}
