import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { environment } from '../enviroments/enviroment';


/**
 * Service class responsible for managing employee-related operations with the server.
 * This service interacts with the backend API to perform CRUD operations on employee data.
 *
 * @export
 * @class EmployeeService
 */
@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

  /**
   * The base URL of the API server.
   *
   * @private
   * @type {string}
   * @memberof EmployeeService
   */
    private apiServerUrl = environment.apiBaseUrl;
    
    /**
     * Creates an instance of EmployeeService.
     *
     * @param {HttpClient} http The Angular HTTP client for making HTTP requests.
     * @memberof EmployeeService
     */
    constructor(private http: HttpClient){}

      /**
       * Retrieves a list of all employees from the server.
       *
       * @returns {Observable<Employee[]>} An Observable containing a list of employees.
       * @memberof EmployeeService
       */
    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
      }

      /**
       * Adds a new employee to the server.
       *
       * @param {Employee} employee The employee object to be added.
       * @returns {Observable<Employee>} An Observable containing the newly added employee.
       * @memberof EmployeeService
       */
      public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
      }


      /**
       * Updates an existing employee on the server.
       *
       * @param {Employee} employee The updated employee object.
       * @returns {Observable<Employee>} An Observable containing the updated employee.
       * @memberof EmployeeService
       */
      public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
      }

      /**
       * Deletes an employee from the server based on the provided employee ID.
       *
       * @param {number} employeeId The unique identifier of the employee to be deleted.
       * @returns {Observable<void>} An Observable indicating the success of the operation.
       * @memberof EmployeeService
       */
      public deleteEmployee(employeeId: number): Observable<void> {
         return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
      }
}