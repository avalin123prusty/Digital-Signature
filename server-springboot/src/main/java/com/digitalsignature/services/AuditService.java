package com.digitalsignature.services;

import com.digitalsignature.models.Audit;
import com.digitalsignature.repositories.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    public Audit logAction(String documentId, String userId, String userEmail, 
                          String action, String ipAddress, String userAgent) {
        Audit audit = new Audit(documentId, userId, userEmail, action, ipAddress, userAgent);
        return auditRepository.save(audit);
    }

    public List<Audit> getAuditTrail(String documentId) {
        return auditRepository.findByDocumentIdOrderByTimestampDesc(documentId);
    }

    public List<Audit> getUserAuditTrail(String userId) {
        return auditRepository.findByUserIdOrderByTimestampDesc(userId);
    }
}
