package com.digitalsignature.controllers;

import com.digitalsignature.dto.ApiResponse;
import com.digitalsignature.services.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/audit")
@CrossOrigin(origins = "http://localhost:3000")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @GetMapping("/{documentId}")
    public ResponseEntity<?> getAuditTrail(@PathVariable String documentId) {
        return ResponseEntity.ok(new ApiResponse("Audit trail retrieved", 
            auditService.getAuditTrail(documentId)));
    }

    @GetMapping("/user/trail")
    public ResponseEntity<?> getUserAuditTrail(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(new ApiResponse("User audit trail retrieved", 
            auditService.getUserAuditTrail(userId)));
    }
}
