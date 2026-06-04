package com.digitalsignature.repositories;

import com.digitalsignature.models.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, String> {
    List<Signature> findByDocumentId(String documentId);
    List<Signature> findBySignerId(String signerId);
}
