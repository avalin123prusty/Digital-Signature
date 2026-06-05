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
@Table(name = "audits")
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String documentId;

    private String userId;

    private String userEmail;

    private String action;

    private String ipAddress;

    private String userAgent;

    private LocalDateTime timestamp;

    public Audit(String documentId, String userId, String userEmail, String action, 
                 String ipAddress, String userAgent) {
        this.documentId = documentId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.action = action;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.timestamp = LocalDateTime.now();
    }
}
