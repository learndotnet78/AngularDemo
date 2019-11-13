import { Injectable} from '@angular/core';
import { Employee } from 'src/model/employee';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'

@Injectable()
export class EmployeeService{
    private listEmployees : Employee[];

    constructor(private _httpClient: HttpClient){}

    getEmployees() : Observable<Employee[]>{
        return this._httpClient.get<Employee[]>('http://localhost:3000/employees').pipe(catchError(this.handleError));
    }

    getEmployee(id : number) : Employee {
        return this.listEmployees.find(e => e.id === id);
    }

    private handleError(errorResponse : HttpErrorResponse){
        if (errorResponse instanceof ErrorEvent)
        {
            console.log('Client side ', errorResponse.error.message)
        } else {
            console.log('Server side ', errorResponse)
        }
        return throwError('Error Occured');
    }
    
    saveEmployee(emp : Employee) : Observable<Employee> {
        if (emp.id === null)
        {
            return this._httpClient.post<Employee>('http://localhost:3000/employees',emp,{
                headers: new HttpHeaders({
                    'Content-Type' : 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
        }
        else {
           const foundIndex = this.listEmployees.findIndex(e => e.id === emp.id);
           this.listEmployees[foundIndex] = emp;
        }
    }


    deleteEmployee(id : number){
        const i = this.listEmployees.findIndex(e => e.id === id);

        if (i !==-1){
            this.listEmployees.splice(i,1);
        }
    }
}