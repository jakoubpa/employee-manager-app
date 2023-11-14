package com.example.employeemanagerapp.repository;

import com.example.employeemanagerapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Repository interface for managing {@link Employee} entities in the database.
 * Extends the JpaRepository interface for generic CRUD operations.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    /**
     * Deletes an employee from the database based on the provided employee ID.
     *
     * @param id The unique identifier of the employee to be deleted.
     */
    void deleteEmployeeById(Long id);
}
