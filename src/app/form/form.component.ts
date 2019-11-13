import { Component, OnInit,ViewChild } from '@angular/core';
import { Employee } from 'src/model/employee';
import { Department } from 'src/model/deparment';
import { EmployeeService } from 'src/services/employeeservice';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('empForm', { static: false }) public CreateEmployeeForm : NgForm;

  employee : Employee;

  departments : Department[] =[
    { deptid : "HR", deptname : "Human Resources"},
    { deptid : "SA", deptname : "Sales"},
    { deptid : "CM", deptname : "Compliance"},
    { deptid : "RG", deptname : "Regualtory"},
    { deptid : "IT", deptname : "Information Technology"}
  ];

  constructor(private empService : EmployeeService,private _router : Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.getEmployee(id);
    });
  }

  saveEmployee(emp): void{
    this.empService.saveEmployee(emp).subscribe(
      (data : Employee) => {
        console.log(data);
        this.CreateEmployeeForm.reset()
        this._router.navigate(['home']);
      },
      (error :any) => console.log(error)
    );
    
  }

  getEmployee(id : number){
    if (name === 0){
      this.employee = new Employee();
      this.CreateEmployeeForm.reset()
    }
    else{
      this.employee = Object.assign({},this.empService.getEmployee(id));
    }
  }

}
