package com.bezkoder.springjwt.repository;
import com.bezkoder.springjwt.models.ClientFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientFileRepository extends JpaRepository<ClientFile, Long> {
    // You can define custom database queries here if needed
}
