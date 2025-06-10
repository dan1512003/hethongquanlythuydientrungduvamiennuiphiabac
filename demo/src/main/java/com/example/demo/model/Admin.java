package com.example.demo.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Document
public class Admin {
     @Id
    private String id;

    @Field
    private String adminname;

    @Field
    private String email;

    @Field
    private String password;

    public Admin() {
    }

    public Admin(String adminname, String email, String password) {
        this.adminname = adminname;
        this.email = email;
        this.password = password;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getAdminname() {
        return adminname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setAdminname(String username) {
        this.adminname = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
@Override
public String toString() {
    return String.format("Admin{id='%s', username='%s', email='%s', password='%s'}", id, adminname, email, password);
}
}
