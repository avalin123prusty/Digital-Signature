package com.digitalsignature.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignatureStatusRequest {
    private String status;
    private String reason;
}
