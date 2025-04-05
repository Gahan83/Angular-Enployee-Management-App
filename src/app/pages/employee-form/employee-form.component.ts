import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { IDepartment } from '../../interface/IDepartment';
import { AsyncPipe, NgFor } from '@angular/common';
import { IDesignation } from '../../interface/IDesignation';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  imports:[FormsModule, AsyncPipe, NgFor],
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeObj:Employee=new Employee();
  employeeService=inject(EmployeeService);
  activatedRoute=inject(ActivatedRoute);
  deptList$:Observable<IDepartment[]>=this.employeeService.getDepartments();
  designationList:IDesignation[]=[];
  employeeId:number=0;
  constructor() { }

  ngOnInit() {
    this.deptList$=this.employeeService.getDepartments();
    this.activatedRoute.params.subscribe((res:any)=>{
      this.employeeId= res.id;
      if(this.employeeId!=0)
      {
        this.getEmployee();
      }
    });
  }

  onSave()
  {
    this.employeeService.createEmployee(this.employeeObj).subscribe((res:Employee)=>{
      alert("Employee Created Successfully");
    },error=>{
      alert(error.error);
    });
  }

  getEmployee()
  {
    this.employeeService.getEmployeeById(this.employeeId).subscribe((res:Employee)=>{
      this.employeeObj=res;
      this.employeeObj.dateOfJoining=this.formatDateToYMD(this.employeeObj.dateOfJoining);
      this.getDesignation();
    });
  }

  formatDateToYMD(dateString:string):string
  {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0'+ (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return  `${year}-${month}-${day}`;
  }

  onUpdate()
  {
    this.employeeService.updateEmployee(this.employeeObj).subscribe((res:Employee)=>{
      alert("Updated Employee Successfully");
    },error=>{
      alert(error.error);
    });
  }

  getDesignation()
  {
    this.employeeService.getDesignationById(this.employeeObj.departmentId).subscribe((res:IDesignation[])=>{
      this.designationList=res;
    });
  }

}
