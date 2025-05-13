package com.example.demo.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    // Sửa phương thức để khớp với tên thuộc tính trong class User
    User findByUsernameOrEmail(String username, String email);

    // Kiểm tra xem email có tồn tại trong database không
    boolean existsByEmail(String email);

    // Kiểm tra xem username có tồn tại trong database không
    boolean existsByUsername(String username);
}
