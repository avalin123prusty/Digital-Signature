package com.digitalsignature.services;

import com.digitalsignature.models.Document;
import com.digitalsignature.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Value("${app.upload-dir}")
    private String uploadDir;

    public Document uploadDocument(String userId, MultipartFile file) throws IOException {
        if (!file.getContentType().equals("application/pdf")) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        // Save file
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Save document metadata
        Document document = new Document(
            userId,
            file.getOriginalFilename(),
            filePath.toString(),
            file.getSize()
        );

        return documentRepository.save(document);
    }

    public List<Document> getUserDocuments(String userId) {
        return documentRepository.findByUserIdOrderByUploadedAtDesc(userId);
    }

    public Document getDocument(String documentId, String userId) {
        Document document = documentRepository.findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));

        if (!document.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return document;
    }

    public byte[] downloadDocument(String documentId, String userId) throws IOException {
        Document document = getDocument(documentId, userId);
        Path filePath = Paths.get(document.getFilePath());
        return Files.readAllBytes(filePath);
    }

    public void updateDocumentStatus(String documentId, String status) {
        Document document = documentRepository.findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
        document.setStatus(status);
        documentRepository.save(document);
    }
}
