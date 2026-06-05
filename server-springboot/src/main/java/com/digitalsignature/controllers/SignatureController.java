package com.digitalsignature.controllers;

import com.digitalsignature.dto.ApiResponse;
import com.digitalsignature.dto.SignatureRequest;
import com.digitalsignature.dto.SignatureStatusRequest;
import com.digitalsignature.models.Signature;
import com.digitalsignature.services.AuditService;
import com.digitalsignature.services.SignatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/signatures")
@CrossOrigin(origins = "http://localhost:3000")
public class SignatureController {

    @Autowired
    private SignatureService signatureService;

    @Autowired
    private AuditService auditService;

    @PostMapping
    public ResponseEntity<?> saveSignature(
            @RequestBody SignatureRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) {
        try {
            String userId = (String) authentication.getPrincipal();
            String email = (String) authentication.getDetails();
            String ipAddress = httpRequest.getRemoteAddr();
            String userAgent = httpRequest.getHeader("User-Agent");

            Signature signature = new Signature(
                request.getDocumentId(),
                userId,
                email,
                request.getCoordinates(),
                request.getSignatureText(),
                request.getSignatureImage()
            );

            Signature savedSignature = signatureService.saveSignature(signature);
            auditService.logAction(request.getDocumentId(), userId, email, "signed", ipAddress, userAgent);

            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse("Signature saved successfully", savedSignature));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<?> getSignatures(@PathVariable String documentId) {
        List<Signature> signatures = signatureService.getSignaturesByDocument(documentId);
        return ResponseEntity.ok(new ApiResponse("Signatures retrieved", signatures));
    }

    @PatchMapping("/{signatureId}")
    public ResponseEntity<?> updateSignatureStatus(
            @PathVariable String signatureId,
            @RequestBody SignatureStatusRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) {
        try {
            String userId = (String) authentication.getPrincipal();
            String email = (String) authentication.getDetails();
            String ipAddress = httpRequest.getRemoteAddr();
            String userAgent = httpRequest.getHeader("User-Agent");

            Signature signature = signatureService.updateSignatureStatus(
                signatureId,
                request.getStatus(),
                request.getReason()
            );

            auditService.logAction(signature.getDocumentId(), userId, email, 
                request.getStatus().equals("rejected") ? "rejected" : "signed", 
                ipAddress, userAgent);

            return ResponseEntity.ok(new ApiResponse("Signature status updated", signature));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }
}
