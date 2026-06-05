package com.digitalsignature.repositories;

import com.digitalsignature.models.Audit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<Audit, String> {
    List<Audit> findByDocumentIdOrderByTimestampDesc(String documentId);
    List<Audit> findByUserIdOrderByTimestampDesc(String userId);
}
