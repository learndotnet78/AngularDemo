import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/model/employee';
import { Router, ActivatedRoute} from '@angular/router';
import { ResolvedEmployeeList } from '../form/resolved-employeelist.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayMessage: string;
  today: number = Date.now();
  getEmployees : Employee[];
  filteredEmployees : Employee[];
  dataFromChild :string;
  error : string;

  private _searchTerm : string;

  get searchTerm() : string{
    return this._searchTerm;
  }

  set searchTerm(value : string){
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  constructor(private _router : Router,private _activatedRoute : ActivatedRoute) {
    const resolvedEmployeeList : ResolvedEmployeeList = this._activatedRoute.snapshot.data['employeeList'];
    if (resolvedEmployeeList.error == null)
      this.getEmployees = resolvedEmployeeList.employeeList;
    else {
      this.error = resolvedEmployeeList.error;
    }
    if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')){
      this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
    }
    else {
      this.filteredEmployees = this.getEmployees ;
    }
   }

  ngOnInit() {
    this.displayMessage =  "This is Angular Demo Page. You have logged on " ;
  }

  filterEmployees(searchString : string) {
      return this.getEmployees.filter(employee =>
        employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  changeEmployeeName(){
    this.getEmployees[0].name = 'Jordan';
  }

  onDeleteNotification(id : number){
    const i = this.filteredEmployees.findIndex(e => e.id === id);

    if (i !==-1){
        this.filteredEmployees.splice(i,1);
    }
  }
}


