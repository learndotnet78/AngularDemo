import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/services/employeeservice';
import { Employee } from 'src/model/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private _id: number;
  employee : Employee;

  constructor(private _route : ActivatedRoute, private _empService : EmployeeService) { }

  ngOnInit() {
    /*
    this._name = this._route.snapshot.paramMap.get('name');
    */
   this._route.paramMap.subscribe( params => {
      this._id = +params.get('id');
      this.employee = this._empService.getEmployee(this._id);
   })

  }

  viewNextEmployee(){

  }



}
