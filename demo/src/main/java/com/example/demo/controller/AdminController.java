package com.example.demo.controller;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.JwtTokenProvider;
import com.example.demo.service.AdminService;
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3001", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AdminController {
    private final AdminService adminService;
    private final JwtTokenProvider jwtTokenProvider;

    public AdminController(AdminService adminService, JwtTokenProvider jwtTokenProvider) {
        this.adminService = adminService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Map<String, String> adminMap) {
        ResponseEntity<String> result = adminService.registerAdmin(adminMap);
        return result;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAdmin(@RequestBody Map<String, String> loginMap) {
        String identifier = loginMap.get("name");
        String password = loginMap.get("password");
   System.out.println("Username: " + identifier);
    System.out.println("Password: " + password);
        if (adminService.authenticateAdmin(identifier, password)) {
         
    
            String token = jwtTokenProvider.createToken(identifier);
            return ResponseEntity.ok(new JwtResponse(token));
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    public static class JwtResponse {
        private String token;

        public JwtResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}