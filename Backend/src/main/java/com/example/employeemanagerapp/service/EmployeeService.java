package com.example.employeemanagerapp.service;

import com.example.employeemanagerapp.exceptions.UserNotFoundException;
import com.example.employeemanagerapp.model.Employee;
import com.example.employeemanagerapp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Service class responsible for handling business logic related to employee entities.
 * Interacts with the {@link EmployeeRepository} for database operations.
 */
@Service
public class EmployeeService {

    /**
     * Autowired instance of {@link EmployeeRepository} for database interaction.
     */
    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Adds a new employee to the system, generating a random employee code.
     *
     * @param employee The {@link Employee} object representing the employee to be added.
     * @return The newly added employee with a generated employee code.
     */
    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString()); // generate random company id
        return employeeRepository.save(employee);
    }

    /**
     * Retrieves a list of all employees in the system.
     *
     * @return A list containing all employees in the system.
     */
    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Updates an existing employee's information in the system.
     *
     * @param employee The {@link Employee} object representing the updated employee information.
     * @return The updated employee.
     */
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    /**
     * Retrieves a specific employee based on the provided employee ID.
     *
     * @param id The unique identifier of the employee.
     * @return The requested employee.
     * @throws UserNotFoundException if the employee with the given ID is not found.
     */
    public Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id " + id + " was not found!"));
    }

    /**
     * Deletes an employee from the system based on the provided employee ID.
     *
     * @param id The unique identifier of the employee to be deleted.
     */
    @Transactional
    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployeeById(id);
    }
}
