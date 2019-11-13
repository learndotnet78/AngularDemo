import { Component, OnInit } from '@angular/core';
import { EmpoyeeApiService } from 'src/services/employeeapi.service';
import { Employee } from 'src/model/employee';

@Component({
  selector: 'app-demoapi',
  templateUrl: './demoapi.component.html',
  styleUrls: ['./demoapi.component.css']
})
export class DemoapiComponent implements OnInit {

  employees : Employee[];
  employee : Employee;
  newEmployee : Employee;
  errorMsg :string;
  demomsg : string;
  
  constructor( private empService : EmpoyeeApiService) { }

  ngOnInit() {
    this.empService.getEmployees()
    .subscribe(
      data => {
        this.employees = data;
      }, 
      error => this.errorMsg = error
    );

    this.empService.getEmployee(1)
    .subscribe(
      data => {
        this.employee = data;
      }
    );

    var emp = new Employee();
    emp.id = 5;
    emp.name = 'Al';
    emp.email = 'al@test.com';
    emp.department = 'Management';
    emp.contactPreference = 'Email';
    emp.gender = 'Male';
    this.empService.postEmployee(emp).subscribe( data => {
      this.newEmployee = data;
    });
  }

}
