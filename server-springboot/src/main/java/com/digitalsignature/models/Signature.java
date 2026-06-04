package com.digitalsignature.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
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
@Table(name = "signatures")
public class Signature {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String documentId;

    private String signerId;

    private String signerEmail;

    @Embedded
    private Coordinates coordinates;

    private String signatureText;

    private String signatureImage;

    private String status;

    private String reason;

    private LocalDateTime signedAt;

    private LocalDateTime createdAt;

    public Signature(String documentId, String signerId, String signerEmail, 
                     Coordinates coordinates, String signatureText, String signatureImage) {
        this.documentId = documentId;
        this.signerId = signerId;
        this.signerEmail = signerEmail;
        this.coordinates = coordinates;
        this.signatureText = signatureText;
        this.signatureImage = signatureImage;
        this.status = "signed";
        this.createdAt = LocalDateTime.now();
        this.signedAt = LocalDateTime.now();
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class Coordinates {
        private Double x;
        private Double y;
        private Integer page;
    }
}
