package com.example.employeemanagerapp.controllers;

import com.example.employeemanagerapp.model.Employee;
import com.example.employeemanagerapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Controller class for managing employee-related operations in the RESTful API.
 *
 * This class handles HTTP requests related to employees and interacts with the
 * {@link EmployeeService} for processing business logic.
 *
 * Endpoints are mapped under "/employee", and cross-origin requests are allowed
 * from any origin.
 */
@RestController
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeResource {

    /**
     * Autowired instance of {@link EmployeeService} for handling employee-related operations.
     */
    @Autowired
    private EmployeeService employeeService;

    /**
     * Retrieves all employees from the system.
     *
     * @return A ResponseEntity containing a list of employees and an HTTP status code.
     *         HttpStatus.OK if successful.
     */
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    /**
     * Retrieves a specific employee based on the provided employee ID.
     *
     * @param id The unique identifier of the employee.
     * @return A ResponseEntity containing the requested employee and an HTTP status code.
     *
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") Long id) {
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    /**
     * Adds a new employee to the system.
     *
     * @param employee The {@link Employee} object representing the employee to be added.
     * @return A ResponseEntity containing the newly added employee and an HTTP status code.
     *         HttpStatus.CREATED if the employee is added successfully.
     */
    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    /**
     * Updates an existing employee in the system.
     *
     * @param employee The {@link Employee} object representing the updated employee information.
     * @return A ResponseEntity containing the updated employee and an HTTP status code.
     *         HttpStatus.OK if the employee is updated successfully.
     */
    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.OK);
    }

    /**
     * Deletes an employee from the system based on the provided employee ID.
     *
     * @param id The unique identifier of the employee to be deleted.
     * @return A ResponseEntity with no content and an HTTP status code.
     *         HttpStatus.OK if the employee is deleted successfully.
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        System.out.println(id);
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
