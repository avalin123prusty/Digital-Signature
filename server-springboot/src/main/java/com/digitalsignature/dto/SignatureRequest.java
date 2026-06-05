package com.digitalsignature.dto;

import com.digitalsignature.models.Signature;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureRequest {
    private String documentId;
    private Signature.Coordinates coordinates;
    private String signatureText;
    private String signatureImage;
}
