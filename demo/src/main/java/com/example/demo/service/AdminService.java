package com.example.demo.service;
import org.springframework.stereotype.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
@Service
public class AdminService {
   @Autowired
   private AdminRepository adminRepository;
   private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

      public ResponseEntity<String> registerAdmin(Map<String, String> userMap) {
        String adminName = userMap.get("adminName");
        String email = userMap.get("email");
        String password = userMap.get("password");
        String rePassword = userMap.get("rePassword");

   
        if(!password.equals(rePassword)) {
            return ResponseEntity.badRequest().body("Adminname already exists or Email already exists or Passwords do not match");
        }

   
        else if (adminRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Adminname already exists or Email already exists or Passwords do not match");
        }

 
        else if (adminRepository.existsByAdminname(adminName)) {
            return ResponseEntity.badRequest().body("Adminname already exists or Email already exists or Passwords do not match");
        }
else {
 String encodedPassword = passwordEncoder.encode(password);

     
        Admin admin = new Admin();
        admin.setAdminname(adminName);
        admin.setEmail(email);
        admin.setPassword(encodedPassword); 

        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully");
}
}   
     public boolean authenticateAdmin(String identifier, String password) {
        
        Admin admin = adminRepository.findByAdminnameOrEmail(identifier, identifier);

        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

}
