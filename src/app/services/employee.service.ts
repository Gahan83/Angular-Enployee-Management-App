import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs';
import { IDepartment } from '../interface/IDepartment';
import { IDesignation } from '../interface/IDesignation';
import { IEmployee } from '../interface/IEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'https://api.freeprojectapi.com/api/EmployeeApp/';
  constructor(private readonly httpClient: HttpClient) {}

  public createEmployee(employeeObj: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiUrl + 'CreateEmployee', employeeObj);
  }
  public updateEmployee(employeeObj: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiUrl + 'UpdateEmployee', employeeObj);
  }

  public getDepartments(): Observable<IDepartment[]> {
    return this.httpClient.get<IDepartment[]>(`${this.apiUrl}GetDepartments`);
  }

  public getEmployeeById(id:number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.apiUrl}${id}`);
  }

  public getDesignationById(deptId: string): Observable<IDesignation[]> {
    return this.httpClient.get<IDesignation[]>(
      `${this.apiUrl}GetDesignationsByDeptId?deptId=${deptId}`
    );
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}deleteEmployee?id=${id}`
    );
  }

  public getAllEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(`${this.apiUrl}GetEmployees`);
  }
}
