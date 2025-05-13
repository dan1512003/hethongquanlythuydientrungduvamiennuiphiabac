package com.example.demo.service;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
@Service
public class UserService {
     @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<String> registerUser(Map<String, String> userMap) {
        String userName = userMap.get("userName");
        String email = userMap.get("email");
        String password = userMap.get("password");
        String rePassword = userMap.get("rePassword");

   
        if(!password.equals(rePassword)) {
            return ResponseEntity.badRequest().body("Username already exists or Email already exists or Passwords do not match");
        }

   
        else if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("Username already exists or Email already exists or Passwords do not match");
        }

 
        else if (userRepository.existsByUsername(userName)) {
            return ResponseEntity.badRequest().body("Username already exists or Email already exists or Passwords do not match");
        }
else {
 String encodedPassword = passwordEncoder.encode(password);

     
        User user = new User();
        user.setUsername(userName);
        user.setEmail(email);
        user.setPassword(encodedPassword); 

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
}
     
       
    }
     public boolean authenticateUser(String identifier, String password) {
        
        User user = userRepository.findByUsernameOrEmail(identifier, identifier);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return true;
        } else {
            return false;
        }
    }
}
