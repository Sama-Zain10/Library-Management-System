package com.library.backend.repo;

import com.library.backend.model.Borrow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BorrowRepo extends MongoRepository<Borrow, String> {
    List<Borrow> findByUserId(String userId);
    List<Borrow> findByUserIdAndStatus(String userId, String status);
    List<Borrow> findByDueDateBeforeAndStatus(LocalDate date, String status);
}
