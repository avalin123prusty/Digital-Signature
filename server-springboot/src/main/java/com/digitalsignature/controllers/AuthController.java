package com.digitalsignature.controllers;

import com.digitalsignature.dto.AuthResponse;
import com.digitalsignature.dto.LoginRequest;
import com.digitalsignature.dto.RegisterRequest;
import com.digitalsignature.dto.UserDTO;
import com.digitalsignature.models.User;
import com.digitalsignature.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserDTO userDTO = authService.register(request);
            User user = new User();
            user.setId(userDTO.getId());
            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());

            String token = authService.generateToken(user);

            AuthResponse response = new AuthResponse(
                "User registered successfully",
                token,
                userDTO
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error: " + e.getMessage(), null, null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request);
            String token = authService.generateToken(user);

            UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail());
            AuthResponse response = new AuthResponse(
                "Login successful",
                token,
                userDTO
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponse("Error: " + e.getMessage(), null, null));
        }
    }
}
