package com.digitalsignature.controllers;

import com.digitalsignature.dto.ApiResponse;
import com.digitalsignature.models.Document;
import com.digitalsignature.services.AuditService;
import com.digitalsignature.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private AuditService auditService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            Authentication authentication,
            HttpServletRequest request) {
        try {
            String userId = (String) authentication.getPrincipal();
            String email = (String) authentication.getDetails();
            String ipAddress = request.getRemoteAddr();
            String userAgent = request.getHeader("User-Agent");

            Document document = documentService.uploadDocument(userId, file);

            auditService.logAction(document.getId(), userId, email, "uploaded", ipAddress, userAgent);

            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse("Document uploaded successfully", document));
        } catch (IOException e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse("Upload failed: " + e.getMessage(), false));
        }
    }

    @GetMapping
    public ResponseEntity<?> getDocuments(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        List<Document> documents = documentService.getUserDocuments(userId);
        return ResponseEntity.ok(new ApiResponse("Documents retrieved", documents));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDocument(
            @PathVariable String id,
            Authentication authentication) {
        try {
            String userId = (String) authentication.getPrincipal();
            Document document = documentService.getDocument(id, userId);
            return ResponseEntity.ok(new ApiResponse("Document retrieved", document));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("Document not found", false));
        }
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<?> downloadDocument(
            @PathVariable String id,
            Authentication authentication) {
        try {
            String userId = (String) authentication.getPrincipal();
            Document document = documentService.getDocument(id, userId);
            byte[] fileContent = documentService.downloadDocument(id, userId);

            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getFileName() + "\"")
                .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("File not found", false));
        }
    }
}
