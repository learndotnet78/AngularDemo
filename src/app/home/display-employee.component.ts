import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import { Employee } from 'src/model/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/services/employeeservice';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  selectedEmpName: number;
  @Input() employee : Employee;
  @Output() notifyDelete : EventEmitter<number> = new EventEmitter<number>() ;
  @Input() searchTerm : string;
  confirmDelete = false;
  panelExpanded = true;
  
  constructor(private _activatedRoute : ActivatedRoute, private _router: Router, private _empService : EmployeeService) { }

  ngOnInit() {
    
    this.selectedEmpName = +this._activatedRoute.snapshot.paramMap.get('id')
  }

  viewEmployee(){
    this._router.navigate(['employees',this.employee.id],{
      queryParams : { 'searchTerm' : this.searchTerm} 
    });
  }

  editEmployee(){
    this._router.navigate(['/edit',this.employee.id]);
  }
  deleteEmployee(){
    this._empService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }




}
