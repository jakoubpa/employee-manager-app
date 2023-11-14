/**
 * Represents an employee in the system.
 *
 * @interface Employee
 */
export interface Employee {
    /**
     * The unique identifier for the employee.
     *
     * @type {number}
     */
    id: number;
  
    /**
     * The name of the employee.
     *
     * @type {string}
     */
    name: string;
  
    /**
     * The email address of the employee.
     *
     * @type {string}
     */
    email: string;
  
    /**
     * The job title of the employee.
     *
     * @type {string}
     */
    jobTitle: string;
  
    /**
     * The phone number of the employee.
     *
     * @type {string}
     */
    phoneNumber: string;
  
    /**
     * The URL of the employee's image.
     *
     * @type {string}
     */
    imageUrl: string;
  
    /**
     * The employee code, a unique identifier.
     *
     * @type {string}
     */
    employeeCode: string;
  }