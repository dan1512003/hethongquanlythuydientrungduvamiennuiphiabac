package com.example.demo.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.Admin;

public interface  AdminRepository extends MongoRepository<Admin, String> {
    
   Admin findByAdminnameOrEmail(String adminname, String email);


    
    boolean existsByEmail(String email);

   
   boolean existsByAdminname(String adminname);

}
