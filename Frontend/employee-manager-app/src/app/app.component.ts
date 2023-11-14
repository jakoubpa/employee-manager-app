import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { NgForm } from '@angular/forms';


/**
 * The root component of the Angular application.
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * An array containing the list of employees.
   *
   * @type {Employee[]}
   * @memberof AppComponent
   */
  public employees: Employee[] = [];

  /**
   * The currently selected employee for editing.
   *
   * @type {Employee | undefined}
   * @memberof AppComponent
   */
  public editEmployee: Employee | undefined;

  /**
   * The currently selected employee for deletion.
   *
   * @type {Employee | undefined}
   * @memberof AppComponent
   */
  public deleteEmployee: Employee | undefined;

  /**
   * Creates an instance of AppComponent.
   *
   * @param {EmployeeService} employeeService The service for handling employee-related operations.
   * @memberof AppComponent
   */
  constructor(private employeeService: EmployeeService){}

  // call the getEmployess function whenever this component is initialized
  ngOnInit() {
    this.getEmployees();
  }

  /**
   * Retrieves the list of employees from the server and updates the component's 'employees' property.
   *
   * @memberof AppComponent
   * @public
   * @returns {void}
   */
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Opens a modal dialog based on the specified mode and employee information.
   *
   * @memberof AppComponent
   * @public
   * @param {Employee | null} employee The employee information for the modal (or null if not applicable).
   * @param {string} mode The mode of the modal ('add', 'edit', or 'delete').
   * @returns {void}
   */
  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else {
      if(employee) {
        if(mode === 'edit') {
          this.editEmployee = employee;
          button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if(mode === 'delete') {
          this.deleteEmployee = employee;
          button.setAttribute('data-target', '#deleteEmployeeModal');
        }
      }
    }
    container?.appendChild(button);
    button.click();
  }

  /**
   * Submits the add employee form, adds a new employee, and updates the component's employee list.
   *
   * @memberof AppComponent
   * @public
   * @param {NgForm} addForm The NgForm representing the add employee form.
   * @returns {void}
   */
  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      });
  }

  /**
   * Submits the update employee form, updates an existing employee, and refreshes the component's employee list.
   *
   * @memberof AppComponent
   * @public
   * @param {Employee} employee The updated employee information.
   * @returns {void}
   */
  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  /**
   * Deletes an employee based on the provided employee ID and refreshes the component's employee list.
   *
   * @memberof AppComponent
   * @public
   * @param {number | undefined} employeeId The unique identifier of the employee to be deleted.
   * @returns {void}
   */
  public onDeleteEmloyee(employeeId: number | undefined): void {
    if(employeeId !== undefined) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
    }
  }

  /**
   * Searches for employees based on the provided search key and updates the component's employee list.
   * If the key is empty or no matching results are found, the original list of employees is restored.
   *
   * @memberof AppComponent
   * @public
   * @param {string} key The search key to filter employees by name, email, phone number, or job title.
   * @returns {void}
   */
  public searchEmployees(key: string): void {
    const results: Employee[] = []
    for(const employee of this.employees) {
      if(employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      || employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      || employee.phoneNumber.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      || employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    
    // Restore the original list if no matching results are found or the search key is empty.
    this.employees = results;
    if(results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
