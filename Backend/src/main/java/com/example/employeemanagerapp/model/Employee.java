package com.example.employeemanagerapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

/**
 * Represents an employee entity in the system.
 *
 * This class is annotated with JPA annotations to define its mapping to the database.
 * It includes fields for various attributes such as name, email, job title, phone number, image URL, and employee code.
 * The class also implements the Serializable interface to indicate that instances of the class can be serialized.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employee implements Serializable {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String phoneNumber;
    private String imageUrl;
    @Column(nullable = false, updatable = false)
    private String employeeCode;
}
