import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from 'src/model/employee';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmpoyeeApiService{

    constructor(private _httpClient : HttpClient){}

    getEmployees() : Observable<any>{
        return this._httpClient.get('http://localhost:3000/employees')
        .pipe(catchError(this.errorHandler));
    }
    errorHandler(error : HttpErrorResponse){
        return throwError( error.message || "Server Error");
    }

    getEmployee(id : number) : Observable<any>{
        return this._httpClient.get('http://localhost:3000/employees/' + id );
    }

    postEmployee(emp : Employee) : Observable<any>{
        return this._httpClient.post('http://localhost:3000/employees' ,emp);
    }
}