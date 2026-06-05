package com.digitalsignature.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "Backend is running");
        return ResponseEntity.ok(response);
    }
}
