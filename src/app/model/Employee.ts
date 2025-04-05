export class Employee {
  employeeId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfJoining: string;
  departmentId: string;
  designationId: string;
  employeeType: string;
  salary: number;

  constructor() {
    this.employeeId = 0;
    this.fullName = '';
    this.email = '';
    this.phone = '';
    this.gender = '';
    this.dateOfJoining = '';
    this.departmentId = '';
    this.designationId = '';
    this.employeeType = '';
    this.salary = 0;
  }
}
