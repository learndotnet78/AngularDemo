import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from 'src/model/employee';
import { Observable, of } from 'rxjs';
import { EmployeeService } from 'src/services/employeeservice';
import { Injectable } from '@angular/core';
import { ResolvedEmployeeList } from './resolved-employeelist.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList>{

    constructor(private _empService : EmployeeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<ResolvedEmployeeList> 
    {
        return this._empService.getEmployees()
        .pipe(map((employeeList) => new ResolvedEmployeeList(employeeList))
        //,catchError((err: any) => Observable.of(new ResolvedEmployeeList(null,err)))
        );
    }

}


//