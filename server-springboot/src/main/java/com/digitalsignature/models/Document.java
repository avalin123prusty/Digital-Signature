package com.digitalsignature.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String userId;

    private String fileName;

    private String filePath;

    private Long fileSize;

    private String mimeType;

    private LocalDateTime uploadedAt;

    private String status;

    public Document(String userId, String fileName, String filePath, Long fileSize) {
        this.userId = userId;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.mimeType = "application/pdf";
        this.uploadedAt = LocalDateTime.now();
        this.status = "pending";
    }
}
