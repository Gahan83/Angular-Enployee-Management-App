import { Component, inject, OnInit } from '@angular/core';
import { IEmployee } from '../../interface/IEmployee';
import { EmployeeService } from '../../services/employee.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [DatePipe],
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList:IEmployee[]=[]
  employeeService=inject(EmployeeService);
  router=inject(Router);
  constructor() { }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    this.employeeService.getAllEmployees().subscribe((res: IEmployee[]) => {
      this.employeeList = res;
    });
  }

  onEdit(employeeId:number)
  {
      this.router.navigate(['edit-employee',employeeId]);
  }

  onDelete(id:number)
  {
    if(confirm("Are you sure to delete this employee?"))
    {
      this.employeeService.deleteEmployee(id).subscribe((res:any)=>{
        alert("Employee Deleted Successfully");
        this.getEmployee();
      },error=>{
        alert(error.error);
      });
    }
  }
}
