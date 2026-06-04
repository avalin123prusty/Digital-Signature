package com.digitalsignature.services;

import com.digitalsignature.models.Signature;
import com.digitalsignature.repositories.SignatureRepository;
import com.digitalsignature.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignatureService {

    @Autowired
    private SignatureRepository signatureRepository;

    @Autowired
    private DocumentRepository documentRepository;

    public Signature saveSignature(Signature signature) {
        // Verify document exists
        documentRepository.findById(signature.getDocumentId())
            .orElseThrow(() -> new RuntimeException("Document not found"));

        return signatureRepository.save(signature);
    }

    public List<Signature> getSignaturesByDocument(String documentId) {
        return signatureRepository.findByDocumentId(documentId);
    }

    public Signature updateSignatureStatus(String signatureId, String status, String reason) {
        Signature signature = signatureRepository.findById(signatureId)
            .orElseThrow(() -> new RuntimeException("Signature not found"));

        if (!status.matches("^(pending|signed|rejected)$")) {
            throw new RuntimeException("Invalid status");
        }

        signature.setStatus(status);
        if ("rejected".equals(status)) {
            signature.setReason(reason);
        } else if ("signed".equals(status)) {
            signature.setSignedAt(java.time.LocalDateTime.now());
        }

        return signatureRepository.save(signature);
    }

    public List<Signature> getSignaturesByUser(String userId) {
        return signatureRepository.findBySignerId(userId);
    }
}
